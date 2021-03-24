import _, { findWhere } from 'underscore';

const villages = [
  {
    slug: 'schlatkow',
    name: 'Schlatkow',
    id: 232,
    region: 'A',
  },
];

const getVillage = slug => {
  return _.findWhere(villages, { slug: slug });
};

export default getVillage;
