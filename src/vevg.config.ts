import { VevgCommunityOverwrite, VevgRegion } from "./vevg.types";

export const vevgRegions: VevgRegion[] = [
  {
    identifier: "OVP",
    name: "Anklam, Wolgast, Greifswald-Land",
    url: "https://www.vevg-karlsburg.de/online-abfallkalender-ovp.html",
    districts: [
      {
        identifier: "A",
        name: "Anklam-Land",
      },
      {
        identifier: "W",
        name: "Wolgast/Usedom",
      },
      {
        identifier: "G",
        name: "Greifswald-Land",
      },
    ],
  },
  {
    identifier: "JTPL",
    name: "Jarmen-Tutow, Peenetal/Loitz",
    url: "https://www.vevg-karlsburg.de/online-abfallkalender-jtpl.html",
    districts: [
      {
        identifier: "L",
        name: "Jarmen-Tutow, Peenetal/Loitz",
      },
    ],
  },
  //   {
  //     identifier: "UHGW",
  //     char: "UHGW",
  //     orgName: "Stadt Greifswald",
  //     url: "https://www.vevg-karlsburg.de/online-abfallkalender-uhgw.html",
  //   },
  {
    identifier: "UER",
    name: "Uecker-Randow",
    url: "https://www.vevg-karlsburg.de/online-abfallkalender-uer.html",
    districts: [
      {
        identifier: "U",
        name: "Uecker-Randow",
      },
    ],
  },
];

export const vevgCommunityOverwrite: VevgCommunityOverwrite[] = [
  {
    name: "Ahlbeck",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    overwriteName: "Seebad Ahlbeck",
    locationQualifier: "Heringsdorf",
  },
  {
    name: "Görke",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Postlow",
  },
  {
    name: "Görke",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Dargen",
  },
  {
    name: "Hohenfelde",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Wolgast",
  },
  {
    name: "Hohenfelde",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Ramin",
  },
  {
    name: "Karlsburg",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Strasburg",
  },
  {
    name: "Liepe",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Rankwitz",
  },
  {
    name: "Liepe",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "ammer an der Uecker",
  },
  {
    name: "Marienfelde",
    regionIdentifier: "JTPL",
    districtIdentifier: "L",
    locationQualifier: "Kruckow",
  },
  {
    name: "Marienfelde",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Strasburg",
  },
  {
    name: "Marienthal",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Rathebur",
  },
  {
    name: "Marienthal",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Viereck",
  },
  {
    name: "Müggenburg",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Neuenkirchen",
  },
  {
    name: "Müggenburg",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Torgelow",
  },
  {
    name: "Neuendorf",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Lütow",
  },
  {
    name: "Neuendorf",
    regionIdentifier: "OVP",
    districtIdentifier: "G",
    locationQualifier: "Kemnitz",
  },
  {
    name: "Neuenkirchen",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "bei Anklam",
  },
  {
    name: "Neuenkirchen",
    regionIdentifier: "OVP",
    districtIdentifier: "G",
    locationQualifier: "bei Greifswald",
  },
  {
    name: "Neuhof",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Stolpe an der Peene",
  },
  {
    name: "Neuhof",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Penkun",
  },
  {
    name: "Papendorf",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Pulow",
  },
  {
    name: "Papendorf",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "bei Pasewalk",
  },
  {
    name: "Rubenow",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Boldekow",
  },
  {
    name: "Rubenow",
    regionIdentifier: "OVP",
    districtIdentifier: "G",
    locationQualifier: "bei Lubmin",
  },
  {
    name: "Schmarsow",
    regionIdentifier: "JTPL",
    districtIdentifier: "L",
    locationQualifier: "Kruckow",
  },
  {
    name: "Schmarsow",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Rollwitz",
  },
  {
    name: "Sophienhof",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Löwitz",
  },
  {
    name: "Sophienhof",
    regionIdentifier: "JTPL",
    districtIdentifier: "L",
    locationQualifier: "Loitz",
  },
  {
    name: "Stolpe",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    overwriteName: "Stolpe an der Peene",
  },
  {
    name: "Stolpe",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Stolpe auf Usedom",
  },
  {
    name: "Thurow",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Medow",
  },
  {
    name: "Thurow",
    regionIdentifier: "OVP",
    districtIdentifier: "G",
    locationQualifier: "Züssow",
  },
  {
    name: "Vierow",
    regionIdentifier: "OVP",
    districtIdentifier: "G",
    locationQualifier: "Brünzow",
  },
  {
    name: "Vierow",
    regionIdentifier: "JTPL",
    districtIdentifier: "L",
    locationQualifier: "Sassen-Trantow",
  },
  {
    name: "Wilhelmshof",
    regionIdentifier: "OVP",
    districtIdentifier: "W",
    locationQualifier: "Usedom",
  },
  {
    name: "Wilhelmshof",
    regionIdentifier: "UER",
    districtIdentifier: "U",
    locationQualifier: "Plöwen",
  },
  {
    name: "Zarrentin",
    regionIdentifier: "OVP",
    districtIdentifier: "A",
    locationQualifier: "Rubkow",
  },
  {
    name: "Zarrentin",
    regionIdentifier: "JTPL",
    districtIdentifier: "L",
    locationQualifier: "Sassen-Trantow",
  },
];
