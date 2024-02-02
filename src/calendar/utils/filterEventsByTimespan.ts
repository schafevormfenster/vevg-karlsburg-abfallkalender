import { VevgProperIcsEvent } from "../../vevg.types";

export const filterEventsByTimespan = (
  events: VevgProperIcsEvent[],
  days: number = 30
): VevgProperIcsEvent[] => {
  // filter from "allEventsFromIcsData" all events that are x days in the future
  // start[0] is year, start[1] is month, start[2] is day

  const today = new Date();
  const xDaysFromNow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + days
  );

  const eventsFiltered = events.filter((event) => {
    const eventDate = new Date(
      event.start[0],
      event.start[1] - 1,
      event.start[2]
    );
    return eventDate < xDaysFromNow;
  });

  return eventsFiltered;
};
