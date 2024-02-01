import { getCommunityList } from "../../../src/communities/getCommunityList";
import { VevgCommunity } from "../../../src/vevg.types";

export async function GET(request: Request) {
  let vevgCommunityList: VevgCommunity[] = await getCommunityList();
  return Response.json({
    results: vevgCommunityList.length,
    communities: vevgCommunityList,
  });
}
