// TODO: use next fetch or axios instead of isomorphic-fetch
import fetch from 'isomorphic-fetch';

async function getIcsFeed(
  village,
  region,
  restmuell = 1,
  gelbersack = 1,
  papiertonne = 1,
  schadstoffmobil = 0
) {
  const baseUrl = 'https://www.vevg-karlsburg.de/abfallkalender/ical_get_utf8.php';
  var now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const year = nextMonth.getFullYear();
  const month = nextMonth.getMonth();
  const params = [
    {
      key: 'ical_1', // Restmülltonne
      value: restmuell,
    },
    {
      key: 'ical_2', // Gelber Sack
      value: gelbersack,
    },
    {
      key: 'ical_3', // Papiertonne
      value: papiertonne,
    },
    {
      key: 'ical_4', // unknown
      value: 0,
    },
    {
      key: 'ical_5', // Schadstoffsammlung?
      value: schadstoffmobil, // TODO: put into a separate feed
    },
    {
      key: 'ical_6', // unknown
      value: 0,
    },
    {
      key: 'ical_ort',
      value: village,
    },
    {
      key: 'ical_kreis',
      value: region,
    },
    {
      key: 'ical_monat',
      value: month,
    },
    {
      key: 'ical_year',
      value: year,
    },
  ];
  const paramString = params
    .map(function (param) {
      return param.key + '=' + param.value;
    })
    .join('&');
  const url = baseUrl + '?' + paramString;

  return await fetch(url).then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad request response from server');
    }
    return response.text();
  });

  //return feed;
}

export default getIcsFeed;
