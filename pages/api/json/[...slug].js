import getVillage from '../../../src/villageMapping';
import getIcsFeed from '../../../src/dataFetching';
import ical from 'node-ical';

export default async function handler(req, res) {
  const { slug } = req.query;
  const village = getVillage(slug[0]);
  if (!village) res.status(400);

  let fixedEvents = [];
  for (let i = 0; i < village.ids.length; i++) {
    const icsFeed = await getIcsFeed(village.ids[i].id, village.region);
    const originalEvents = ical.sync.parseICS(icsFeed);

    for (const event of Object.values(originalEvents)) {
      if (event.type === 'VEVENT') {
        let tmpEvent = JSON.parse(JSON.stringify(event));
        tmpEvent.categories = ['Waste disposal'];
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
          if (tmpEvent.summary.includes('Restmüll')) {
            tmpEvent.summary = 'Restmüll';
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

        const newEvent = {
          id: tmpEvent.uid,
          summary: tmpEvent.summary,
          description: tmpEvent.description,
          location: tmpEvent.location,
          start: tmpEvent.start,
          end: tmpEvent.end,
          updated: tmpEvent.dtstamp,
          categories: tmpEvent.categories,
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

  const jsonBody = {
    village: village,
    events: fixedEvents,
  };

  res.status(200).json(jsonBody);
}
