import { villages } from '../../../src/villageMapping';
import getIcsFeed from '../../../src/dataFetching';
import ical from 'node-ical';
var _ = require('lodash');
var slugify = require('slugify');

export default async function handler(req, res) {
  const year = new Date().getFullYear();

  let fixedEvents = [];

  for (let i = 0; i < villages.length; i++) {
    const village = villages[i];

    for (let i = 0; i < village.ids.length; i++) {
      const icsFeed = await getIcsFeed(village.ids[i].id, village.region, 0, 0, 0, 1);

      const originalEvents = ical.sync.parseICS(icsFeed);

      for (const event of Object.values(originalEvents)) {
        if (event.type === 'VEVENT') {
          let tmpEvent = JSON.parse(JSON.stringify(event));
          tmpEvent.categories = ['Waste disposal'];
          tmpEvent.htmlLink =
            'https://www.vevg-karlsburg.de/termine-fuer-die-mobile-schadstoffsammlung.html?year=' +
            year;
          if (tmpEvent.location.includes('Schadstoffmobil')) {
            const tmpVillage = tmpEvent.location.split(':')[0].trim();
            const tmpLocation = tmpEvent.description.split('\n')[0].split(':')[1].trim();
            tmpEvent.summary = tmpEvent.summary.trim();
            tmpEvent.location = tmpLocation + ', ' + tmpVillage;
            tmpEvent.description = tmpEvent.description.split('\n')[0].trim();
            tmpEvent.scope = 'municipality';
            tmpEvent.categories.push('Hazardous waste');
          }
          tmpEvent._id = slugify(`${tmpEvent.start}-${tmpEvent.summary}-${tmpEvent.location}`, {
            replacement: '-',
            lower: true,
            strict: true,
            locale: 'de',
          });

          const newEvent = {
            id: tmpEvent._id,
            summary: tmpEvent.summary,
            description: tmpEvent.description,
            location: tmpEvent.location,
            start: tmpEvent.start,
            end: tmpEvent.end,
            updated: tmpEvent.dtstamp,
            categories: tmpEvent.categories,
            htmlLink: tmpEvent.htmlLink,
            organizer: {
              email: 'info@vevg-karlsburg.de',
              displayName: 'VEVG Karlsburg',
            },
            visibility: tmpEvent.class.toLowerCase(),
            scope: tmpEvent.scope,
          };

          fixedEvents.push(newEvent);
        }
      }
    }
  }

  const uniqFixedEvents = _.uniqBy(fixedEvents, function (e) {
    return e.id;
  });

  const jsonBody = {
    schadstoffmobil: {
      events: uniqFixedEvents,
    },
  };

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).json(jsonBody);
}
