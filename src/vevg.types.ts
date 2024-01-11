export interface VevgDistrict {
  identifier: string;
  name: string;
}

export interface VevgRegion {
  identifier: string;
  name: string;
  url: string;
  districts: VevgDistrict[];
}

export interface VevgCommunity {
  name: string;
  regionIdentifier: string;
  districtIdentifier?: string;
  districtName?: string;
  hasDuplicate?: boolean;
  location?: string;
  id: number;
}

export interface VevgCommunityOverwrite
  extends Pick<
    VevgCommunity,
    "name" | "regionIdentifier" | "districtIdentifier"
  > {
  overwriteName?: string;
  locationQualifier?: string;
}
