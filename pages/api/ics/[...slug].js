import getVillage from '../../../src/villageMapping';
import getIcsFeed from '../../../src/dataFetching';
import ical from 'node-ical';
const ics = require('ics');

export default async function handler(req, res) {
  const { slug } = req.query;
  const village = getVillage(slug[0]);
  if (!village) res.status(400);

  const icsFeed = await getIcsFeed(village.id, village.region);
  const originalEvents = ical.sync.parseICS(icsFeed);

  let fixedEvents = [];
  let icsEvents = [];
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

      const tmpStartDate = new Date(tmpEvent.start);
      let tmpEndDate = new Date(tmpEvent.end);
      if (!tmpEndDate.getFullYear()) {
        tmpEndDate = new Date(tmpEvent.start);
        tmpEndDate.setMinutes(tmpEndDate.getMinutes() + 30);
      }
      const newIcsEvent = {
        uid: tmpEvent.uid,
        start: [
          tmpStartDate.getFullYear(),
          tmpStartDate.getMonth() + 1,
          tmpStartDate.getDate(),
          tmpStartDate.getHours(),
          tmpStartDate.getMinutes(),
        ],
        startInputType: 'local',
        end: [
          tmpEndDate.getFullYear(),
          tmpEndDate.getMonth() + 1,
          tmpEndDate.getDate(),
          tmpEndDate.getHours(),
          tmpEndDate.getMinutes(),
        ],
        endInputType: 'local',
        title: tmpEvent.summary,
        description: tmpEvent.description,
        location: tmpEvent.location,
        categories: [tmpEvent.categories],
        organizer: { name: 'VEVG Karlsburg', email: 'info@vevg-karlsburg.de' },
        productId: 'Abfallkalender',
      };

      fixedEvents.push(newIcsEvent);
      icsEvents.push(ics.createEvent(newIcsEvent));
    }
  }

  const icsBody = ics.createEvents(fixedEvents);

  const debug = {
    village: village,
    originalEvents: originalEvents,
    fixedEvents: fixedEvents,
    icsEvents: icsEvents,
    ics: ics,
  };

  // res.status(200).json({ originalEvents: originalEvents, fixedEvents: fixedEvents });

  res.setHeader('Content-Type', 'text/calendar; charset=utf8');
  res.status(200).send(icsBody.value);
}
