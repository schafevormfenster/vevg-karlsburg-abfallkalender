import { villages } from '../../src/villageMapping';

export default async function handler(req, res) {
  const villageIndex = villages.map(function (village) {
    return {
      name: village.name,
      slug: village.slug,
      json: '/api/json/' + village.slug,
      ics: '/api/ics/' + village.slug,
    };
  });

  const indexByVillages = {
    organizer: {
      name: 'VEVG Karlsburg',
      fullName: 'Ver- und Entsorgungsgesellschaft des Landkreises Vorpommern-Greifswald mbH',
      website: 'https://www.vevg-karlsburg.de/',
      email: 'info@vevg-karlsburg.de',
      villages: villageIndex,
    },
  };

  res.status(200).json(indexByVillages);
}
