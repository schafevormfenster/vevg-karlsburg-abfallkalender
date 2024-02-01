import {
  VevgCommunity,
  VevgIcsQuery,
  VevgProperIcsEvent,
} from "../../../src/vevg.types";
import { getCommunityList } from "../../../src/communities/getCommunityList";
import { fetchIcsFeedsDelayed } from "../../../src/calendar/fetchIcsFeedsDelayed";
const ics = require("ics");

export async function GET(request: Request) {
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

  // generate ics
  const icsBody = ics.createEvents(allEvents);

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
