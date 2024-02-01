import {
  TextWithData,
  dataToHtml,
} from "@schafevormfenster/data-text-mapper/dist";
import { vevgOrganizer, vevgRegions } from "../vevg.config";
import {
  VevgCommunity,
  VevgProperIcsEvent,
  VevgRawIcsEvent,
} from "../vevg.types";
import { getProperSummary } from "./utils/getProperSummary";
import { getProperTags } from "./utils/getProperTags";

export const qualifyEvent = (
  rawIcsEvent: VevgRawIcsEvent,
  community: VevgCommunity
): VevgProperIcsEvent => {
  // get date from raw event
  const tmpStartDate = new Date(rawIcsEvent.start);
  let tmpEndDate = new Date(rawIcsEvent.end);
  if (!tmpEndDate.getFullYear()) {
    tmpEndDate = new Date(rawIcsEvent.start);
    tmpEndDate.setMinutes(tmpEndDate.getMinutes() + 30);
  }

  // calculate detail link
  const baseUrl: string =
    vevgRegions.find((region) => {
      return region.identifier === community.regionIdentifier;
    })?.url || "";
  const detailLink = new URL(baseUrl);
  detailLink.searchParams.append("part", "5");
  detailLink.searchParams.append("param", "K");
  detailLink.searchParams.append("anz", "2");
  detailLink.searchParams.append("key", community.id.toString());

  // build URL params by URI object
  const urlParams: URLSearchParams = new URLSearchParams({});

  const descriptionData: TextWithData = {
    description: rawIcsEvent.summary,
    categories: ["Entsorgung"],
    scopes: ["Ort"],
    tags: getProperTags(rawIcsEvent.summary) || ["Entsorgung"],
    url: detailLink.toString(),
  };

  const properEvent: VevgProperIcsEvent = {
    uid: rawIcsEvent.uid,
    title: getProperSummary(rawIcsEvent.summary) || rawIcsEvent.summary,
    description: dataToHtml(descriptionData),
    location: community.location || community.name,
    start: [
      tmpStartDate.getFullYear(),
      tmpStartDate.getMonth() + 1,
      tmpStartDate.getDate(),
      tmpStartDate.getHours(),
      tmpStartDate.getMinutes(),
    ],
    startInputType: "local",
    end: [
      tmpEndDate.getFullYear(),
      tmpEndDate.getMonth() + 1,
      tmpEndDate.getDate(),
      tmpEndDate.getHours(),
      tmpEndDate.getMinutes(),
    ],
    endInputType: "local",
    categories: getProperTags(rawIcsEvent.summary) || ["Entsorgung"],
    url: detailLink.toString(),
    organizer: vevgOrganizer,
    calName: "Abfallkalender der VEVG Karlsburg",
    productId: "Abfallkalender der VEVG Karlsburg",
    // updated: rawIcsEvent.dtstamp, // TODO: use lastUpdated
    // htmlContent: dataToHtml(descriptionData), // skip to reduce response size
  };
  return properEvent;
};
