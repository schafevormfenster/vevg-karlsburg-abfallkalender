import fetch from 'isomorphic-fetch';

async function getIcsFeed(village, region) {
  const baseUrl = 'https://www.vevg-karlsburg.de/abfallkalender/ical_get_utf8.php';
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const params = [
    {
      key: 'ical_1',
      value: 1,
    },
    {
      key: 'ical_2',
      value: 1,
    },
    {
      key: 'ical_3',
      value: 1,
    },
    {
      key: 'ical_4',
      value: 1,
    },
    {
      key: 'ical_5',
      value: 1,
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

  const feed = await fetch(url).then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad request response from server');
    }
    return response.text();
  });

  return feed;
}

export default getIcsFeed;
