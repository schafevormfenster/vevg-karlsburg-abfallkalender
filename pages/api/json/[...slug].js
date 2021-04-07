import getVillage from '../../../src/villageMapping';
import getIcsFeed from '../../../src/dataFetching';
import ical from 'node-ical';

export default async function handler(req, res) {
  const { slug } = req.query;
  const village = getVillage(slug[0]);
  if (!village) res.status(400);

  const icsFeed = await getIcsFeed(village.id, village.region);
  const originalEvents = ical.sync.parseICS(icsFeed);

  let fixedEvents = [];

  for (const event of Object.values(originalEvents)) {
    if (event.type === 'VEVENT') {
      let tmpEvent = JSON.parse(JSON.stringify(event));
      tmpEvent.categories = 'Entsorgung';
      if (tmpEvent.location.includes('Schadstoffmobil')) {
        const tmpVillage = tmpEvent.location.split(':')[0].trim();
        const tmpLocation = tmpEvent.description.split('\n')[0].split(':')[1].trim();
        tmpEvent.summary = tmpEvent.summary.trim();
        tmpEvent.location = tmpLocation + ', ' + tmpVillage;
        tmpEvent.description = tmpEvent.description.split('\n')[0].trim();
      } else {
        tmpEvent.description = tmpEvent.summary + '\n' + tmpEvent.location;
        tmpEvent.location = village.name;
        if (tmpEvent.summary.includes('Restmüll')) tmpEvent.summary = 'Restmüll';
        if (tmpEvent.summary.includes('Papier')) tmpEvent.summary = 'Altpapier';
        if (tmpEvent.summary.includes('gelb')) tmpEvent.summary = 'Gelber Sack';
      }

      const newEvent = {
        id: tmpEvent.uid,
        summary: tmpEvent.summary,
        description: tmpEvent.description,
        location: tmpEvent.location,
        start: tmpEvent.start,
        end: tmpEvent.end,
        updated: tmpEvent.dtstamp,
        organizer: {
          email: 'info@vevg-karlsburg.de',
          displayName: 'VEVG Karlsburg',
        },
        visibility: tmpEvent.class.toLowerCase(),
      };

      fixedEvents.push(newEvent);
    }
  }

  const jsonBody = {
    village: village,
    events: fixedEvents,
  };

  res.status(200).json(jsonBody);
}
