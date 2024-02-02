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

export const maxDuration: number = 420; // 7 minutes

export async function GET() {
  const wasteType: VevgWasteType = "restmuell";

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
  const eventsFilteredByWasteType = filterEventsByWasteType(
    allEvents,
    wasteType
  );

  // filter by time span
  const days: number = 45;
  const eventsFilteredByTimespan = filterEventsByTimespan(
    eventsFilteredByWasteType,
    days
  );

  // generate ics
  const icsBody = ics.createEvents(eventsFilteredByTimespan);

  // send a response with ics as body, NO json
  const cacheTTL: number = 24 * 60 * 60; // 24 hours
  const staleTime: number = 60 * 60; // 1 hour
  const response = new Response(icsBody.value, {
    status: 200,
    statusText: "OK",
    headers: {
      "content-type": "text/calendar; charset=UTF-8",
      "cache-control": `s-maxage=${cacheTTL}, stale-while-revalidate=${staleTime}`,
    },
  });

  return response;
}
