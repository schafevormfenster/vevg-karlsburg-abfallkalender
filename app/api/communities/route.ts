import { getCommunityList } from "../../../src/communities/getCommunityList";
import { VevgCommunity, VevgRegion } from "../../../src/vevg.types";

export async function GET(request: Request) {
  let vevgCommunityList: VevgCommunity[] = await getCommunityList();
  return Response.json({ communities: vevgCommunityList });
}
