import { villages } from '../../../src/villageMapping';
import getIcsFeed from '../../../src/dataFetching';
import ical from 'node-ical';
var _ = require('lodash');
const ics = require('ics');

export default async function handler(req, res) {
  let fixedEvents = [];

  for (let i = 0; i < villages.length; i++) {
    const village = villages[i];

    for (let i = 0; i < village.ids.length; i++) {
      const icsFeed = await getIcsFeed(village.ids[i].id, village.region, 0, 0, 0, 1);

      const originalEvents = ical.sync.parseICS(icsFeed);

      for (const event of Object.values(originalEvents)) {
        if (event.type === 'VEVENT') {
          let tmpEvent = JSON.parse(JSON.stringify(event));
          tmpEvent.categories = ['Waste disposal'.toUpperCase()];
          if (tmpEvent.location.includes('Schadstoffmobil')) {
            const tmpVillage = tmpEvent.location.split(':')[0].trim();
            const tmpLocation = tmpEvent.description.split('\n')[0].split(':')[1].trim();
            tmpEvent.summary = tmpEvent.summary.trim();
            tmpEvent.location = tmpLocation + ', ' + tmpVillage;
            tmpEvent.description = tmpEvent.description.split('\n')[0].trim();
            tmpEvent.categories.push('Hazardous waste'.toUpperCase());
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
            categories: tmpEvent.categories,
            organizer: { name: 'VEVG Karlsburg', email: 'info@vevg-karlsburg.de' },
            productId: 'Abfallkalender',
          };

          fixedEvents.push(newIcsEvent);
          //icsEvents.push(ics.createEvent(newIcsEvent));
        }
      }
    }
  }

  const uniqFixedEvents = _.uniqBy(fixedEvents, function (e) {
    return e.id;
  });

  const icsBody = ics.createEvents(uniqFixedEvents);

  // res.status(200).json({ originalEvents: originalEvents, fixedEvents: fixedEvents });

  res.setHeader('Content-Type', 'text/calendar; charset=utf8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).send(icsBody.value);
}
