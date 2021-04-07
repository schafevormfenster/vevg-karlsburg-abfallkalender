import { villages } from '../../src/villageMapping';

export default async function handler(req, res) {
  const villageIndex = villages.map(function (village) {
    return { name: village.name, slug: village.slug, ics: '/api/ics/' + village.slug };
  });

  const indexByVillages = {
    villages: villageIndex,
  };

  res.status(200).json(indexByVillages);
}
