import getVillage from '../../../src/villageMapping';
import getIcsFeed from '../../../src/dataFetching';
import ical from 'node-ical';
var slugify = require('slugify');

export default async function handler(req, res) {
  const { slug } = req.query;
  const village = getVillage(slug[0]);
  if (!village) {
    res.status(404).json({ status: 404 });
  } else {
    const year = new Date().getFullYear();

    let fixedEvents = [];
    for (let i = 0; i < village.ids.length; i++) {
      const icsFeed = await getIcsFeed(village.ids[i].id, village.region);
      const originalEvents = ical.sync.parseICS(icsFeed);

      for (const event of Object.values(originalEvents)) {
        if (event.type === 'VEVENT') {
          let tmpEvent = JSON.parse(JSON.stringify(event));
          tmpEvent.categories = ['Waste disposal'];
          tmpEvent.htmlLink =
            'https://www.vevg-karlsburg.de/online-abfallkalender-ovp.html?part=5&param=K&anz=2&key=' +
            village.ids[i].id +
            '%23' +
            encodeURI(village.name) +
            '%23' +
            village.region +
            '%23&year=' +
            year +
            '&month=1';
          if (tmpEvent.location.includes('Schadstoffmobil')) {
            const tmpVillage = tmpEvent.location.split(':')[0].trim();
            const tmpLocation = tmpEvent.description.split('\n')[0].split(':')[1].trim();
            tmpEvent.summary = tmpEvent.summary.trim();
            tmpEvent.location = tmpLocation + ', ' + tmpVillage;
            tmpEvent.description = tmpEvent.description.split('\n')[0].trim();
            tmpEvent.scope = 'municipality';
            tmpEvent.categories.push('Hazardous waste');
          } else {
            tmpEvent.description = tmpEvent.summary + '\n' + tmpEvent.location;
            if (village.ids[i].remark)
              tmpEvent.description += '\n' + village.name + ' ' + village.ids[i].remark;
            if (village.remark) tmpEvent.description += '\n' + village.name + ' ' + village.remark;
            tmpEvent.location = village.name;
            if (tmpEvent.summary.includes('Restm??ll')) {
              tmpEvent.summary = 'Restm??ll';
              tmpEvent.categories.push('Residual waste');
            }
            if (tmpEvent.summary.includes('Papier')) {
              tmpEvent.summary = 'Altpapier';
              tmpEvent.categories.push('Waste paper');
            }
            if (tmpEvent.summary.includes('gelb')) {
              tmpEvent.summary = 'Gelber Sack';
              tmpEvent.categories.push('Packaging waste');
            }
            tmpEvent.scope = 'community';
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
            village: {
              name: village.name,
              slug: village.slug,
              geonameId: village?.geonameId ? village.geonameId : null,
            },
            visibility: tmpEvent.class.toLowerCase(),
            scope: tmpEvent.scope,
          };

          fixedEvents.push(newEvent);
        }
      }
    }

    const jsonBody = {
      village: {
        name: village.name,
        slug: village.slug,
        events: fixedEvents,
      },
    };

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).json(jsonBody);
  }
}
