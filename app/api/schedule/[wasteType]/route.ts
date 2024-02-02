import {
  VevgCommunity,
  VevgIcsQuery,
  VevgProperIcsEvent,
  VevgWasteType,
} from "../../../../src/vevg.types";
import { getCommunityList } from "../../../../src/communities/getCommunityList";
import { fetchIcsFeedsDelayed } from "../../../../src/calendar/fetchIcsFeedsDelayed";
import { filterEventsByWasteType } from "../../../../src/calendar/utils/filterEventsByWasteType";
import { filterEventsByTimespan } from "../../../../src/calendar/utils/filterEventsByTimespan";
const ics = require("ics");

export async function GET(
  request: Request,
  { params }: { params: { wasteType: string } }
) {
  // get all communities
  const vevgCommunityList: VevgCommunity[] = await getCommunityList();

  // build a list of queries for fetchIcsFeed()
  const queries: VevgIcsQuery[] = vevgCommunityList.map(
    (vevgCommunity: VevgCommunity) => {
      return {
        village: vevgCommunity.id || 0,
        districtIdentifier: vevgCommunity.districtIdentifier || "",
      };
    }
  );

  const allEvents: VevgProperIcsEvent[] =
    (await fetchIcsFeedsDelayed(queries)) || [];

  // exit on error
  if (!allEvents || allEvents.length === 0) {
    console.error("No events found");
    return Response.error();
  }

  // filter by wasteType
  const wasteType: VevgWasteType = params.wasteType as VevgWasteType;
  const eventsFilteredByWasteType = filterEventsByWasteType(
    allEvents,
    wasteType
  );

  // filter by time span
  const days: number = 30;
  const eventsFilteredByTimespan = filterEventsByTimespan(
    eventsFilteredByWasteType,
    days
  );

  // generate ics
  const icsBody = ics.createEvents(eventsFilteredByTimespan);

  // send a response with ics as body, NO json
  const response = new Response(icsBody.value, {
    status: 200,
    statusText: "OK",
    headers: {
      "content-type": "text/calendar; charset=UTF-8",
      "cache-control": "s-maxage=86400, stale-while-revalidate=3600",
    },
  });

  return response;
}
