import { VevgIcsQuery, VevgProperIcsEvent } from "../vevg.types";
import { fetchIcsFeed } from "./fetchIcsFeed";

export const fetchIcsFeedsDelayed = async (
  queries: VevgIcsQuery[],
  chunkSize: number = 12
): Promise<VevgProperIcsEvent[] | null> => {
  // reduce queries to max. some items
  // queries = queries.slice(0, 12); // this is only meaningful for testing or debugging

  // split up queries in chunks by chunkSize
  const queryChunks: VevgIcsQuery[][] = [];
  for (let i = 0; i < queries.length; i += chunkSize) {
    queryChunks.push(queries.slice(i, i + chunkSize));
  }

  const allEventsFromIcsData: VevgProperIcsEvent[] = [];

  // iterate over queryChunks
  for (const queryChunk of queryChunks) {
    // iterate over all queries of the chunk using Promise.All
    const chunkData: number[] = await Promise.all(
      queryChunk.map(async (query: VevgIcsQuery) => {
        const eventsFromIcsData: VevgProperIcsEvent[] =
          (await fetchIcsFeed(query)) || [];
        // push all events to allEventsFromIcsData
        allEventsFromIcsData.push(...eventsFromIcsData);
        return eventsFromIcsData.length;
      })
    );
    await new Promise((f) => setTimeout(f, 1200)); // let the vevg website breath
  }

  // filter from "allEventsFromIcsData" all events that are more than two month in the future
  // start[0] is year, start[1] is month, start[2] is day
  const today = new Date();
  const twoMonthsFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );
  const allEventsFromIcsDataFiltered = allEventsFromIcsData.filter((event) => {
    const eventDate = new Date(
      event.start[0],
      event.start[1] - 1,
      event.start[2]
    );
    return eventDate < twoMonthsFromNow;
  });

  // sort "allEventsFromIcsData" by start[0], start[1], start[2]
  allEventsFromIcsDataFiltered.sort((a, b) => {
    const aStart = a.start;
    const bStart = b.start;
    if (aStart[0] < bStart[0]) {
      return -1;
    }
    if (aStart[0] > bStart[0]) {
      return 1;
    }
    if (aStart[1] < bStart[1]) {
      return -1;
    }
    if (aStart[1] > bStart[1]) {
      return 1;
    }
    if (aStart[2] < bStart[2]) {
      return -1;
    }
    if (aStart[2] > bStart[2]) {
      return 1;
    }
    return 0;
  });

  return allEventsFromIcsDataFiltered;
};
