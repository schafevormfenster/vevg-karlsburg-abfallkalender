import _, { findWhere } from 'underscore';

const villages = [
  {
    id: 301,
    name: 'Ahlbeck',
    region: 'W',
    slug: 'ahlbeck',
  },
  {
    id: 1,
    name: 'Albinshof',
    region: 'A',
    slug: 'albinshof',
  },
  {
    id: 736,
    name: 'Alt Brüssow',
    region: 'G',
    slug: 'alt-bruessow',
  },
  {
    id: 2,
    name: 'Alt Kosenow',
    region: 'A',
    slug: 'alt-kosenow',
  },
  {
    id: 601,
    name: 'Alt Negentin',
    region: 'G',
    slug: 'alt-negentin',
  },
  {
    id: 602,
    name: 'Alt Pansow',
    region: 'G',
    slug: 'alt-pansow',
  },
  {
    id: 3,
    name: 'Alt Sanitz',
    region: 'A',
    slug: 'alt-sanitz',
  },
  {
    id: 4,
    name: 'Alt Teterin',
    region: 'A',
    slug: 'alt-teterin',
  },
  {
    id: 603,
    name: 'Alt Ungnade',
    region: 'G',
    slug: 'alt-ungnade',
  },
  {
    id: 5,
    name: 'Anklam',
    region: 'A',
    slug: 'anklam',
  },
  {
    id: 138,
    name: 'Anklamer Fähre',
    region: 'A',
    slug: 'anklamer-faehre',
  },
  {
    id: 13,
    name: 'Auerose',
    region: 'A',
    slug: 'auerose',
  },
  {
    id: 302,
    name: 'Balm',
    region: 'W',
    slug: 'balm',
  },
  {
    id: 604,
    name: 'Bandelin',
    region: 'G',
    slug: 'bandelin',
  },
  {
    id: 303,
    name: 'Bannemin',
    region: 'W',
    slug: 'bannemin',
  },
  {
    id: 304,
    name: 'Bansin',
    region: 'W',
    slug: 'bansin',
  },
  {
    id: 305,
    name: 'Bansin Dorf',
    region: 'W',
    slug: 'bansin-dorf',
  },
  {
    id: 140,
    name: 'Bargischow',
    region: 'A',
    slug: 'bargischow',
  },
  {
    id: 306,
    name: 'Bauer',
    region: 'W',
    slug: 'bauer',
  },
  {
    id: 605,
    name: 'Behrenhoff',
    region: 'G',
    slug: 'behrenhoff',
  },
  {
    id: 307,
    name: 'Benz',
    region: 'W',
    slug: 'benz',
  },
  {
    id: 141,
    name: 'Blesewitz',
    region: 'A',
    slug: 'blesewitz',
  },
  {
    id: 142,
    name: 'Boldekow',
    region: 'A',
    slug: 'boldekow',
  },
  {
    id: 606,
    name: 'Boltenhagen',
    region: 'G',
    slug: 'boltenhagen',
  },
  {
    id: 143,
    name: 'Bömitz',
    region: 'A',
    slug: 'boemitz',
  },
  {
    id: 144,
    name: 'Borntin',
    region: 'A',
    slug: 'borntin',
  },
  {
    id: 308,
    name: 'Bossin',
    region: 'W',
    slug: 'bossin',
  },
  {
    id: 607,
    name: 'Breechen',
    region: 'G',
    slug: 'breechen',
    remark: 'außer Peenestr. 8-9a',
  },
  {
    id: 734,
    name: 'Breechen',
    region: 'G',
    slug: 'breechen',
    remark: 'nur Peenestr. 8-9a',
  },
  {
    id: 145,
    name: 'Brenkenhof',
    region: 'A',
    slug: 'brenkenhof',
  },
  {
    id: 608,
    name: 'Brünzow',
    region: 'G',
    slug: 'bruenzow',
  },
  {
    id: 60,
    name: 'Brüssow',
    region: 'G',
    slug: 'bruessow',
  },
  {
    id: 30,
    name: 'Buddenhagen',
    region: 'W',
    slug: 'buddenhagen',
  },
  {
    id: 146,
    name: 'Bugewitz',
    region: 'A',
    slug: 'bugewitz',
  },
  {
    id: 310,
    name: 'Buggenhagen',
    region: 'W',
    slug: 'buggenhagen',
  },
  {
    id: 147,
    name: 'Buggow',
    region: 'A',
    slug: 'buggow',
  },
  {
    id: 610,
    name: 'Busdorf',
    region: 'G',
    slug: 'busdorf',
  },
  {
    id: 148,
    name: 'Busow',
    region: 'A',
    slug: 'busow',
  },
  {
    id: 14,
    name: 'Butzow',
    region: 'A',
    slug: 'butzow',
  },
  {
    id: 150,
    name: 'Charlottenhof',
    region: 'A',
    slug: 'charlottenhof',
  },
  {
    id: 611,
    name: 'Dambeck',
    region: 'G',
    slug: 'dambeck',
  },
  {
    id: 612,
    name: 'Dargelin',
    region: 'G',
    slug: 'dargelin',
    remark: '+ Dargelin Hof',
  },
  {
    id: 311,
    name: 'Dargen',
    region: 'W',
    slug: 'dargen',
  },
  {
    id: 613,
    name: 'Dargezin',
    region: 'G',
    slug: 'dargezin',
  },
  {
    id: 614,
    name: 'Dargezin Vorwerk',
    region: 'G',
    slug: 'dargezin-vorwerk',
  },
  {
    id: 151,
    name: 'Dargibell',
    region: 'A',
    slug: 'dargibell',
  },
  {
    id: 152,
    name: 'Daugzin',
    region: 'A',
    slug: 'daugzin',
  },
  {
    id: 153,
    name: 'Dennin',
    region: 'A',
    slug: 'dennin',
  },
  {
    id: 615,
    name: 'Dersekow',
    region: 'G',
    slug: 'dersekow',
  },
  {
    id: 154,
    name: 'Dersewitz',
    region: 'A',
    slug: 'dersewitz',
  },
  {
    id: 312,
    name: 'Dewichow',
    region: 'W',
    slug: 'dewichow',
  },
  {
    id: 616,
    name: 'Diedrichshagen',
    region: 'G',
    slug: 'diedrichshagen',
  },
  {
    id: 617,
    name: 'Dreizehnhausen',
    region: 'G',
    slug: 'dreizehnhausen',
  },
  {
    id: 155,
    name: 'Drewelow',
    region: 'A',
    slug: 'drewelow',
  },
  {
    id: 156,
    name: 'Ducherow',
    region: 'A',
    slug: 'ducherow',
  },
  {
    id: 157,
    name: 'Fasanenhof',
    region: 'A',
    slug: 'fasanenhof',
  },
  {
    id: 618,
    name: 'Frätow',
    region: 'G',
    slug: 'fraetow',
  },
  {
    id: 313,
    name: 'Freest',
    region: 'W',
    slug: 'freest',
  },
  {
    id: 61,
    name: 'Friedrichsfelde',
    region: 'G',
    slug: 'friedrichsfelde',
  },
  {
    id: 620,
    name: 'Fritzow',
    region: 'G',
    slug: 'fritzow',
  },
  {
    id: 621,
    name: 'Gahlkow',
    region: 'G',
    slug: 'gahlkow',
  },
  {
    id: 314,
    name: 'Garz',
    region: 'W',
    slug: 'garz',
  },
  {
    id: 158,
    name: 'Gellendin',
    region: 'A',
    slug: 'gellendin',
  },
  {
    id: 315,
    name: 'Gellenthin',
    region: 'W',
    slug: 'gellenthin',
  },
  {
    id: 622,
    name: 'Giesekenhagen',
    region: 'G',
    slug: 'giesekenhagen',
  },
  {
    id: 623,
    name: 'Gladrow',
    region: 'G',
    slug: 'gladrow',
  },
  {
    id: 15,
    name: 'Glien ',
    region: 'A',
    slug: 'glien',
  },
  {
    id: 624,
    name: 'Glödenhof',
    region: 'G',
    slug: 'gloedenhof',
  },
  {
    id: 316,
    name: 'Gneventhin',
    region: 'W',
    slug: 'gneventhin',
  },
  {
    id: 160,
    name: 'Gnevezin',
    region: 'A',
    slug: 'gnevezin',
  },
  {
    id: 161,
    name: 'Görke',
    region: 'A',
    slug: 'goerke-kreis-anklam',
  },
  {
    id: 317,
    name: 'Görke',
    region: 'W',
    slug: 'goerke-kreis-wolgast',
  },
  {
    id: 318,
    name: 'Gothen',
    region: 'W',
    slug: 'gothen',
  },
  {
    id: 162,
    name: 'Gramzow',
    region: 'A',
    slug: 'gramzow',
  },
  {
    id: 625,
    name: 'Gribow',
    region: 'G',
    slug: 'gribow',
  },
  {
    id: 626,
    name: 'Gristow',
    region: 'G',
    slug: 'gristow',
  },
  {
    id: 163,
    name: 'Groß Bünzow',
    region: 'A',
    slug: 'gross-buenzow',
  },
  {
    id: 31,
    name: 'Groß Ernsthof',
    region: 'W',
    slug: 'gross-ernsthof',
  },
  {
    id: 164,
    name: 'Groß Jasedow',
    region: 'A',
    slug: 'gross-jasedow',
  },
  {
    id: 627,
    name: 'Groß Karrendorf',
    region: 'G',
    slug: 'gross-karrendorf',
    remark: 'außer Dorfstr. 6-6b und 7-11',
  },
  {
    id: 731,
    name: 'Groß Karrendorf',
    region: 'G',
    slug: 'gross-karrendorf',
    remark: 'nur Dorfstr. 6-6b und 7-11',
  },
  {
    id: 628,
    name: 'Groß Kieshof',
    region: 'G',
    slug: 'gross-kieshof',
  },
  {
    id: 630,
    name: 'Groß Kiesow',
    region: 'G',
    slug: 'gross-kiesow',
    remark: '+ Groß Kiesow Meierei',
  },
  {
    id: 631,
    name: 'Groß Petershagen',
    region: 'G',
    slug: 'gross-petershagen',
  },
  {
    id: 165,
    name: 'Groß Polzin',
    region: 'A',
    slug: 'gross-polzin',
  },
  {
    id: 632,
    name: 'Grubenhagen',
    region: 'G',
    slug: 'grubenhagen',
  },
  {
    id: 320,
    name: 'Grüssow',
    region: 'W',
    slug: 'gruessow',
  },
  {
    id: 166,
    name: 'Grüttow',
    region: 'A',
    slug: 'gruettow',
  },
  {
    id: 633,
    name: 'Guest',
    region: 'G',
    slug: 'guest',
  },
  {
    id: 321,
    name: 'Gummlin',
    region: 'W',
    slug: 'gummlin',
  },
  {
    id: 634,
    name: 'Gustebin',
    region: 'G',
    slug: 'gustebin',
  },
  {
    id: 635,
    name: 'Gützkow',
    region: 'G',
    slug: 'guetzkow',
    remark: 'außer Gartenstr., Kleine Wallstr., Müllerwall, Töpferstr.',
  },
  {
    id: 735,
    name: 'Gützkow',
    region: 'G',
    slug: 'guetzkow',
    remark: 'nur Gartenstr., Kleine Wallstr.,Müllerwall, Töpferstr.',
  },
  {
    id: 725,
    name: 'Gützkow-Meierei',
    region: 'G',
    slug: 'guetzkow-meierei',
  },
  {
    id: 636,
    name: 'Hanshagen',
    region: 'G',
    slug: 'hanshagen',
    remark:
      'außer Am Gerstenberg, Hainweg, Obere Bachstraßen, Zum Grund, Zum Hellbusch, Zum Langenmoor',
  },
  {
    id: 727,
    name: 'Hanshagen',
    region: 'G',
    slug: 'hanshagen',
    remark:
      'nur Am Gerstenberg, Hainweg, Obere Bachstraßen, Zum Grund, Zum Hellbusch, Zum Langenmoor',
  },
  {
    id: 167,
    name: 'Heidberg',
    region: 'A',
    slug: 'heidberg',
  },
  {
    id: 637,
    name: 'Heilgeisthof',
    region: 'G',
    slug: 'heilgeisthof',
  },
  {
    id: 638,
    name: 'Helmshagen',
    region: 'G',
    slug: 'helmshagen',
  },
  {
    id: 322,
    name: 'Heringsdorf',
    region: 'W',
    slug: 'heringsdorf',
  },
  {
    id: 324,
    name: 'Heringsdorf',
    region: 'W',
    slug: 'heringsdorf-neuhof',
  },
  {
    id: 63,
    name: 'Hinrichshagen',
    region: 'G',
    slug: 'hinrichshagen',
    remark: '+ Hof, Buchenberg, Siedlungen',
  },
  {
    id: 326,
    name: 'Hohendorf',
    region: 'W',
    slug: 'hohendorf',
  },
  {
    id: 327,
    name: 'Hohenfelde',
    region: 'W',
    slug: 'hohenfelde',
  },
  {
    id: 328,
    name: 'Hohensee',
    region: 'W',
    slug: 'hohensee',
  },
  {
    id: 32,
    name: 'Hollendorf',
    region: 'W',
    slug: 'hollendorf',
  },
  {
    id: 640,
    name: 'Immenhorst',
    region: 'G',
    slug: 'immenhorst',
  },
  {
    id: 168,
    name: 'Iven',
    region: 'A',
    slug: 'iven',
  },
  {
    id: 641,
    name: 'Jagdkrug',
    region: 'G',
    slug: 'jagdkrug',
  },
  {
    id: 642,
    name: 'Jägerhof',
    region: 'G',
    slug: 'jaegerhof',
  },
  {
    id: 330,
    name: 'Jamitzow',
    region: 'W',
    slug: 'jamitzow',
  },
  {
    id: 16,
    name: 'Janow',
    region: 'A',
    slug: 'janow',
  },
  {
    id: 170,
    name: 'Japenzin',
    region: 'A',
    slug: 'japenzin',
  },
  {
    id: 171,
    name: 'Jargelin',
    region: 'A',
    slug: 'jargelin',
  },
  {
    id: 643,
    name: 'Jarmshagen',
    region: 'G',
    slug: 'jarmshagen',
  },
  {
    id: 172,
    name: 'Johanneshof',
    region: 'A',
    slug: 'johanneshof',
  },
  {
    id: 644,
    name: 'Johannisthal',
    region: 'G',
    slug: 'johannisthal',
  },
  {
    id: 331,
    name: 'Kachlin',
    region: 'W',
    slug: 'kachlin',
  },
  {
    id: 173,
    name: 'Kagendorf',
    region: 'A',
    slug: 'kagendorf',
  },
  {
    id: 174,
    name: 'Kagenow',
    region: 'A',
    slug: 'kagenow',
  },
  {
    id: 175,
    name: 'Kalkstein',
    region: 'A',
    slug: 'kalkstein',
  },
  {
    id: 645,
    name: 'Kalkvitz',
    region: 'G',
    slug: 'kalkvitz',
  },
  {
    id: 646,
    name: 'Kammin',
    region: 'G',
    slug: 'kammin',
  },
  {
    id: 332,
    name: 'Kamminke',
    region: 'W',
    slug: 'kamminke',
  },
  {
    id: 176,
    name: 'Kamp',
    region: 'A',
    slug: 'kamp',
  },
  {
    id: 647,
    name: 'Karbow',
    region: 'G',
    slug: 'karbow',
  },
  {
    id: 648,
    name: 'Karlsburg',
    region: 'G',
    slug: 'karlsburg',
  },
  {
    id: 333,
    name: 'Karlshagen',
    region: 'W',
    slug: 'karlshagen',
  },
  {
    id: 334,
    name: 'Karnin',
    region: 'W',
    slug: 'karnin',
  },
  {
    id: 335,
    name: 'Karrin',
    region: 'W',
    slug: 'karrin',
  },
  {
    id: 336,
    name: 'Katschow',
    region: 'W',
    slug: 'katschow',
  },
  {
    id: 64,
    name: 'Katzow',
    region: 'G',
    slug: 'katzow',
  },
  {
    id: 177,
    name: 'Kavelpaß',
    region: 'A',
    slug: 'kavelpass',
  },
  {
    id: 650,
    name: 'Kemnitz',
    region: 'G',
    slug: 'kemnitz',
    remark: '+ Kemnitz-Meierei',
  },
  {
    id: 651,
    name: 'Kemnitzerhagen',
    region: 'G',
    slug: 'kemnitzerhagen',
    remark: 'außer 11-19',
  },
  {
    id: 732,
    name: 'Kemnitzerhagen',
    region: 'G',
    slug: 'kemnitzerhagen',
    remark: 'nur 11-19',
  },
  {
    id: 652,
    name: 'Kessin',
    region: 'G',
    slug: 'kessin',
  },
  {
    id: 62,
    name: 'Kieshof-Ausbau',
    region: 'G',
    slug: 'kieshof-ausbau',
  },
  {
    id: 178,
    name: 'Klein Below',
    region: 'A',
    slug: 'klein-below',
  },
  {
    id: 17,
    name: 'Klein Bünzow',
    region: 'A',
    slug: 'klein-buenzow',
  },
  {
    id: 260,
    name: 'Klein Bünzow Ausbau',
    region: 'A',
    slug: 'klein-buenzow-ausbau',
  },
  {
    id: 653,
    name: 'Klein Ernsthof',
    region: 'G',
    slug: 'klein-ernsthof',
  },
  {
    id: 337,
    name: 'Klein Jasedow',
    region: 'W',
    slug: 'klein-jasedow',
  },
  {
    id: 654,
    name: 'Klein Karrendorf',
    region: 'G',
    slug: 'klein-karrendorf',
  },
  {
    id: 655,
    name: 'Klein Kieshof',
    region: 'G',
    slug: 'klein-kieshof',
  },
  {
    id: 656,
    name: 'Klein Kiesow',
    region: 'G',
    slug: 'klein-kiesow',
  },
  {
    id: 657,
    name: 'Klein Petershagen',
    region: 'G',
    slug: 'klein-petershagen',
  },
  {
    id: 180,
    name: 'Klein Polzin',
    region: 'A',
    slug: 'klein-polzin',
  },
  {
    id: 658,
    name: 'Klein Schönwalde',
    region: 'G',
    slug: 'klein-schoenwalde',
  },
  {
    id: 65,
    name: 'Klein Zastrow',
    region: 'G',
    slug: 'klein-zastrow',
  },
  {
    id: 181,
    name: 'Klitschendorf',
    region: 'A',
    slug: 'klitschendorf',
  },
  {
    id: 338,
    name: 'Klotzow',
    region: 'W',
    slug: 'klotzow',
    remark: 'außer Lindenallee',
  },
  {
    id: 543,
    name: 'Klotzow',
    region: 'W',
    slug: 'klotzow',
    remark: 'nur Lindenallee',
  },
  {
    id: 33,
    name: 'Kölpin',
    region: 'W',
    slug: 'koelpin',
  },
  {
    id: 340,
    name: 'Kölpinsee',
    region: 'W',
    slug: 'koelpinsee',
  },
  {
    id: 660,
    name: 'Kölzin',
    region: 'G',
    slug: 'koelzin',
  },
  {
    id: 661,
    name: 'Konerow',
    region: 'G',
    slug: 'konerow',
  },
  {
    id: 182,
    name: 'Konsages',
    region: 'A',
    slug: 'konsages',
  },
  {
    id: 341,
    name: 'Korswandt',
    region: 'W',
    slug: 'korswandt',
  },
  {
    id: 342,
    name: 'Koserow',
    region: 'W',
    slug: 'koserow',
  },
  {
    id: 662,
    name: 'Kowall',
    region: 'G',
    slug: 'kowall',
  },
  {
    id: 663,
    name: 'Kräpelin',
    region: 'G',
    slug: 'kraepelin',
  },
  {
    id: 664,
    name: 'Krebsow',
    region: 'G',
    slug: 'krebsow',
  },
  {
    id: 183,
    name: 'Krenzow',
    region: 'A',
    slug: 'krenzow',
  },
  {
    id: 184,
    name: 'Krien',
    region: 'A',
    slug: 'krien',
  },
  {
    id: 185,
    name: 'Krien-Horst',
    region: 'A',
    slug: 'krien-horst',
  },
  {
    id: 343,
    name: 'Krienke',
    region: 'W',
    slug: 'krienke',
  },
  {
    id: 344,
    name: 'Kröslin',
    region: 'W',
    slug: 'kroeslin',
  },
  {
    id: 345,
    name: 'Krummin',
    region: 'W',
    slug: 'krummin',
  },
  {
    id: 186,
    name: 'Krusenfelde',
    region: 'A',
    slug: 'krusenfelde',
  },
  {
    id: 187,
    name: 'Krusenkrien',
    region: 'A',
    slug: 'krusenkrien',
  },
  {
    id: 665,
    name: 'Kühlenhagen',
    region: 'G',
    slug: 'kuehlenhagen',
  },
  {
    id: 666,
    name: 'Kuntzow',
    region: 'G',
    slug: 'kuntzow',
  },
  {
    id: 188,
    name: 'Kurtshagen',
    region: 'A',
    slug: 'kurtshagen',
  },
  {
    id: 346,
    name: 'Kutzow',
    region: 'W',
    slug: 'kutzow',
  },
  {
    id: 347,
    name: 'Labömitz',
    region: 'W',
    slug: 'laboemitz',
  },
  {
    id: 348,
    name: 'Lassan',
    region: 'W',
    slug: 'lassan',
  },
  {
    id: 667,
    name: 'Latzow',
    region: 'G',
    slug: 'latzow',
  },
  {
    id: 668,
    name: 'Leist',
    region: 'G',
    slug: 'leist',
  },
  {
    id: 18,
    name: 'Lentschow',
    region: 'A',
    slug: 'lentschow',
  },
  {
    id: 66,
    name: 'Levenhagen',
    region: 'G',
    slug: 'levenhagen',
  },
  {
    id: 190,
    name: 'Libnow',
    region: 'A',
    slug: 'libnow',
  },
  {
    id: 34,
    name: 'Liepe',
    region: 'W',
    slug: 'liepe',
  },
  {
    id: 191,
    name: 'Liepen',
    region: 'A',
    slug: 'liepen',
  },
  {
    id: 350,
    name: 'Loddin',
    region: 'W',
    slug: 'loddin',
  },
  {
    id: 670,
    name: 'Lodmannshagen',
    region: 'G',
    slug: 'lodmannshagen',
  },
  {
    id: 671,
    name: 'Loissin',
    region: 'G',
    slug: 'loissin',
  },
  {
    id: 192,
    name: 'Löwitz',
    region: 'A',
    slug: 'loewitz',
  },
  {
    id: 672,
    name: 'Lubmin',
    region: 'G',
    slug: 'lubmin',
  },
  {
    id: 193,
    name: 'Lucienhof',
    region: 'A',
    slug: 'lucienhof',
  },
  {
    id: 673,
    name: 'Ludwigsburg',
    region: 'G',
    slug: 'ludwigsburg',
  },
  {
    id: 674,
    name: 'Lühmannsdorf',
    region: 'G',
    slug: 'luehmannsdorf',
  },
  {
    id: 194,
    name: 'Lüskow',
    region: 'A',
    slug: 'lueskow',
  },
  {
    id: 675,
    name: 'Lüssow',
    region: 'G',
    slug: 'luessow',
  },
  {
    id: 351,
    name: 'Lütow',
    region: 'W',
    slug: 'luetow',
  },
  {
    id: 352,
    name: 'Mahlzow',
    region: 'W',
    slug: 'mahlzow',
  },
  {
    id: 195,
    name: 'Marienthal',
    region: 'A',
    slug: 'marienthal',
  },
  {
    id: 196,
    name: 'Medow',
    region: 'A',
    slug: 'medow',
  },
  {
    id: 353,
    name: 'Mellenthin',
    region: 'W',
    slug: 'mellenthin',
  },
  {
    id: 197,
    name: 'Menzlin',
    region: 'A',
    slug: 'menzlin',
  },
  {
    id: 676,
    name: 'Mesekenhagen',
    region: 'G',
    slug: 'mesekenhagen',
  },
  {
    id: 354,
    name: 'Milchhorst',
    region: 'W',
    slug: 'milchhorst',
  },
  {
    id: 677,
    name: 'Moeckow',
    region: 'G',
    slug: 'moeckow',
    remark: '+ Moeckow-Berg',
  },
  {
    id: 355,
    name: 'Mölschow',
    region: 'W',
    slug: 'moelschow',
  },
  {
    id: 356,
    name: 'Mönchow',
    region: 'W',
    slug: 'moenchow',
  },
  {
    id: 357,
    name: 'Morgenitz ',
    region: 'W',
    slug: 'morgenitz',
  },
  {
    id: 198,
    name: 'Müggenburg',
    region: 'A',
    slug: 'mueggenburg',
  },
  {
    id: 19,
    name: 'Murchin',
    region: 'A',
    slug: 'murchin',
  },
  {
    id: 678,
    name: 'Müssow',
    region: 'G',
    slug: 'muessow',
  },
  {
    id: 358,
    name: 'Neeberg',
    region: 'W',
    slug: 'neeberg',
  },
  {
    id: 200,
    name: 'Neetzow',
    region: 'A',
    slug: 'neetzow',
  },
  {
    id: 35,
    name: 'Negenmark',
    region: 'W',
    slug: 'negenmark',
  },
  {
    id: 360,
    name: 'Neppermin',
    region: 'W',
    slug: 'neppermin',
  },
  {
    id: 67,
    name: 'Nepzin',
    region: 'G',
    slug: 'nepzin',
  },
  {
    id: 201,
    name: 'Nerdin',
    region: 'A',
    slug: 'nerdin',
  },
  {
    id: 680,
    name: 'Netzeband',
    region: 'G',
    slug: 'netzeband',
  },
  {
    id: 361,
    name: 'Netzelkow',
    region: 'W',
    slug: 'netzelkow',
  },
  {
    id: 681,
    name: 'Neu Boltenhagen',
    region: 'G',
    slug: 'neu-boltenhagen',
  },
  {
    id: 682,
    name: 'Neu Dargelin',
    region: 'G',
    slug: 'neu-dargelin',
  },
  {
    id: 202,
    name: 'Neu Kosenow',
    region: 'A',
    slug: 'neu-kosenow',
  },
  {
    id: 203,
    name: 'Neu Krien',
    region: 'A',
    slug: 'neu-krien',
  },
  {
    id: 683,
    name: 'Neu Negentin',
    region: 'G',
    slug: 'neu-negentin',
  },
  {
    id: 684,
    name: 'Neu Pansow',
    region: 'G',
    slug: 'neu-pansow',
  },
  {
    id: 362,
    name: 'Neu Pudagla',
    region: 'W',
    slug: 'neu-pudagla',
  },
  {
    id: 363,
    name: 'Neu Sallenthin',
    region: 'W',
    slug: 'neu-sallenthin',
  },
  {
    id: 204,
    name: 'Neu Sanitz',
    region: 'A',
    slug: 'neu-sanitz',
  },
  {
    id: 205,
    name: 'Neu Teterin',
    region: 'A',
    slug: 'neu-teterin',
  },
  {
    id: 685,
    name: 'Neu Ungnade',
    region: 'G',
    slug: 'neu-ungnade',
  },
  {
    id: 364,
    name: 'Neuendorf',
    region: 'W',
    slug: 'neuendorf-kreis-wolgast',
  },
  {
    id: 686,
    name: 'Neuendorf',
    region: 'G',
    slug: 'neuendorf-bei-guetzkow',
  },
  {
    id: 687,
    name: 'Neuendorf',
    region: 'G',
    slug: 'neuendorf-bei-kemnitz',
    remark: '+ Neuendorf-Ausbau',
  },
  {
    id: 206,
    name: 'Neuendorf A',
    region: 'A',
    slug: 'neuendorf-a-kreis-anklam',
  },
  {
    id: 207,
    name: 'Neuendorf B',
    region: 'A',
    slug: 'neuendorf-b-kreis-anklam',
  },
  {
    id: 208,
    name: 'Neuenkirchen',
    region: 'A',
    slug: 'neuenkirchen-kreis-anklam',
  },
  {
    id: 688,
    name: 'Neuenkirchen',
    region: 'G',
    slug: 'neuenkirchen-kreis-greifswald',
  },
  {
    id: 20,
    name: 'Neuhof',
    region: 'A',
    slug: 'neuhof-kreis-anklam',
  },
  {
    id: 365,
    name: 'Neverow',
    region: 'W',
    slug: 'neverow',
  },
  {
    id: 68,
    name: 'Nonnendorf',
    region: 'G',
    slug: 'nonnendorf',
  },
  {
    id: 690,
    name: 'Oldenburg',
    region: 'G',
    slug: 'oldenburg',
  },
  {
    id: 691,
    name: 'Oldenhagen',
    region: 'G',
    slug: 'oldenhagen',
  },
  {
    id: 366,
    name: 'Ostklüne',
    region: 'W',
    slug: 'ostkluene',
  },
  {
    id: 692,
    name: 'Owstin',
    region: 'G',
    slug: 'owstin',
  },
  {
    id: 210,
    name: 'Padderow',
    region: 'A',
    slug: 'padderow',
  },
  {
    id: 211,
    name: 'Pamitz',
    region: 'A',
    slug: 'pamitz',
  },
  {
    id: 212,
    name: 'Panschow',
    region: 'A',
    slug: 'panschow',
  },
  {
    id: 367,
    name: 'Papendorf',
    region: 'W',
    slug: 'papendorf',
  },
  {
    id: 368,
    name: 'Paske',
    region: 'W',
    slug: 'paske',
  },
  {
    id: 213,
    name: 'Pätschow',
    region: 'A',
    slug: 'paetschow',
  },
  {
    id: 36,
    name: 'Peenemünde',
    region: 'W',
    slug: 'peenemuende',
  },
  {
    id: 214,
    name: 'Pelsin',
    region: 'A',
    slug: 'pelsin',
  },
  {
    id: 693,
    name: 'Pentin ',
    region: 'G',
    slug: 'pentin',
  },
  {
    id: 215,
    name: 'Pinnow',
    region: 'A',
    slug: 'pinnow',
  },
  {
    id: 216,
    name: 'Postlow',
    region: 'A',
    slug: 'postlow',
  },
  {
    id: 694,
    name: 'Potthagen',
    region: 'G',
    slug: 'potthagen',
  },
  {
    id: 370,
    name: 'Prätenow',
    region: 'W',
    slug: 'praetenow',
  },
  {
    id: 217,
    name: 'Preetzen',
    region: 'A',
    slug: 'preetzen',
  },
  {
    id: 218,
    name: 'Priemen',
    region: 'A',
    slug: 'priemen',
  },
  {
    id: 371,
    name: 'Pritzier',
    region: 'W',
    slug: 'pritzier',
  },
  {
    id: 695,
    name: 'Pritzwald',
    region: 'G',
    slug: 'pritzwald',
  },
  {
    id: 372,
    name: 'Pudagla',
    region: 'W',
    slug: 'pudagla',
  },
  {
    id: 373,
    name: 'Pulow',
    region: 'W',
    slug: 'pulow',
  },
  {
    id: 21,
    name: 'Putzar',
    region: 'A',
    slug: 'putzar',
  },
  {
    id: 374,
    name: 'Quilitz',
    region: 'W',
    slug: 'quilitz',
  },
  {
    id: 220,
    name: 'Quilow',
    region: 'A',
    slug: 'quilow',
  },
  {
    id: 696,
    name: 'Radlow',
    region: 'G',
    slug: 'radlow',
    remark: 'außer Am Felde 26-27',
  },
  {
    id: 733,
    name: 'Radlow',
    region: 'G',
    slug: 'radlow',
    remark: 'nur Am Felde 26-27',
  },
  {
    id: 221,
    name: 'Ramitzow',
    region: 'A',
    slug: 'ramitzow',
  },
  {
    id: 375,
    name: 'Rankwitz',
    region: 'W',
    slug: 'rankwitz',
  },
  {
    id: 697,
    name: 'Ranzin',
    region: 'G',
    slug: 'ranzin',
  },
  {
    id: 698,
    name: 'Rappenhagen',
    region: 'G',
    slug: 'rappenhagen',
  },
  {
    id: 222,
    name: 'Rathebur',
    region: 'A',
    slug: 'rathebur',
  },
  {
    id: 223,
    name: 'Rebelow',
    region: 'A',
    slug: 'rebelow',
  },
  {
    id: 376,
    name: 'Reestow',
    region: 'W',
    slug: 'reestow',
  },
  {
    id: 377,
    name: 'Reetzow',
    region: 'W',
    slug: 'reetzow',
  },
  {
    id: 224,
    name: 'Rehberg',
    region: 'A',
    slug: 'rehberg',
  },
  {
    id: 225,
    name: 'Relzow',
    region: 'A',
    slug: 'relzow',
  },
  {
    id: 226,
    name: 'Rosenhagen',
    region: 'A',
    slug: 'rosenhagen',
  },
  {
    id: 227,
    name: 'Rossin',
    region: 'A',
    slug: 'rossin',
  },
  {
    id: 228,
    name: 'Rubenow',
    region: 'A',
    slug: 'rubenow-kreis-anklam',
  },
  {
    id: 69,
    name: 'Rubenow',
    region: 'G',
    slug: 'rubenow-kreis-greifswald',
  },
  {
    id: 22,
    name: 'Rubkow',
    region: 'A',
    slug: 'rubkow',
  },
  {
    id: 230,
    name: 'Salchow',
    region: 'A',
    slug: 'salchow',
  },
  {
    id: 378,
    name: 'Sallenthin',
    region: 'W',
    slug: 'sallenthin',
  },
  {
    id: 700,
    name: 'Sanz',
    region: 'G',
    slug: 'sanz',
  },
  {
    id: 231,
    name: 'Sarnow',
    region: 'A',
    slug: 'sarnow',
  },
  {
    id: 37,
    name: 'Sauzin',
    region: 'W',
    slug: 'sauzin',
  },
  {
    id: 380,
    name: 'Schalense',
    region: 'W',
    slug: 'schalense',
  },
  {
    id: 701,
    name: 'Schlagtow',
    region: 'G',
    slug: 'schlagtow',
  },
  {
    id: 702,
    name: 'Schlagtow-Meierei',
    region: 'G',
    slug: 'schlagtow-meierei',
  },
  {
    id: 232,
    name: 'Schlatkow',
    region: 'A',
    slug: 'schlatkow',
  },
  {
    id: 233,
    name: 'Schmatzin',
    region: 'A',
    slug: 'schmatzin',
  },
  {
    id: 703,
    name: 'Schmoldow',
    region: 'G',
    slug: 'schmoldow',
  },
  {
    id: 234,
    name: 'Schmuggerow',
    region: 'A',
    slug: 'schmuggerow',
  },
  {
    id: 235,
    name: 'Schwerinsburg',
    region: 'A',
    slug: 'schwerinsburg',
  },
  {
    id: 236,
    name: 'Schwerinshorst',
    region: 'A',
    slug: 'schwerinshorst',
  },
  {
    id: 381,
    name: 'Seckeritz',
    region: 'W',
    slug: 'seckeritz',
  },
  {
    id: 382,
    name: 'Sellin',
    region: 'W',
    slug: 'sellin',
  },
  {
    id: 704,
    name: 'Sestelin',
    region: 'G',
    slug: 'sestelin',
  },
  {
    id: 237,
    name: 'Sophienhof',
    region: 'A',
    slug: 'sophienhof',
  },
  {
    id: 383,
    name: 'Spandowerhagen',
    region: 'W',
    slug: 'spandowerhagen',
  },
  {
    id: 238,
    name: 'Spantekow',
    region: 'A',
    slug: 'spantekow',
  },
  {
    id: 384,
    name: 'Stagnieß',
    region: 'W',
    slug: 'stagniess',
  },
  {
    id: 23,
    name: 'Stammersfelde',
    region: 'A',
    slug: 'stammersfelde',
  },
  {
    id: 705,
    name: 'Steffenshagen',
    region: 'G',
    slug: 'steffenshagen',
  },
  {
    id: 706,
    name: 'Steinfurth',
    region: 'G',
    slug: 'steinfurth',
  },
  {
    id: 240,
    name: 'Steinmocker',
    region: 'A',
    slug: 'steinmocker',
  },
  {
    id: 707,
    name: 'Stevelin',
    region: 'G',
    slug: 'stevelin',
  },
  {
    id: 708,
    name: 'Stilow',
    region: 'G',
    slug: 'stilow',
  },
  {
    id: 70,
    name: 'Stilow-Siedlung',
    region: 'G',
    slug: 'stilow-siedlung',
  },
  {
    id: 385,
    name: 'Stoben',
    region: 'W',
    slug: 'stoben',
  },
  {
    id: 241,
    name: 'Stolpe',
    region: 'A',
    slug: 'stolpe-kreis-anklam',
  },
  {
    id: 386,
    name: 'Stolpe',
    region: 'W',
    slug: 'stolpe-kreis-wolgast',
  },
  {
    id: 710,
    name: 'Strellin',
    region: 'G',
    slug: 'strellin',
  },
  {
    id: 711,
    name: 'Stresow',
    region: 'G',
    slug: 'stresow',
    remark: '+ Stresow-Siedlung',
  },
  {
    id: 242,
    name: 'Stretense',
    region: 'A',
    slug: 'stretense',
  },
  {
    id: 243,
    name: 'Strippow',
    region: 'A',
    slug: 'strippow',
  },
  {
    id: 387,
    name: 'Stubbenfelde',
    region: 'W',
    slug: 'stubbenfelde',
  },
  {
    id: 712,
    name: 'Subzow',
    region: 'G',
    slug: 'subzow',
  },
  {
    id: 388,
    name: 'Suckow',
    region: 'W',
    slug: 'suckow',
  },
  {
    id: 244,
    name: 'Thurow',
    region: 'A',
    slug: 'thurow',
  },
  {
    id: 713,
    name: 'Thurow',
    region: 'G',
    slug: 'thurow',
  },
  {
    id: 245,
    name: 'Tramstow',
    region: 'A',
    slug: 'tramstow',
  },
  {
    id: 38,
    name: 'Trassenheide',
    region: 'W',
    slug: 'trassenheide',
  },
  {
    id: 390,
    name: 'Ückeritz',
    region: 'W',
    slug: 'ueckeritz',
  },
  {
    id: 391,
    name: 'Ulrichshorst',
    region: 'W',
    slug: 'ulrichshorst',
  },
  {
    id: 714,
    name: 'Upatel',
    region: 'G',
    slug: 'upatel',
  },
  {
    id: 392,
    name: 'Usedom',
    region: 'W',
    slug: 'usedom',
  },
  {
    id: 715,
    name: 'Vargatz',
    region: 'G',
    slug: 'vargatz',
  },
  {
    id: 716,
    name: 'Vierow',
    region: 'G',
    slug: 'vierow',
  },
  {
    id: 246,
    name: 'Vitense',
    region: 'A',
    slug: 'vitense',
  },
  {
    id: 717,
    name: 'Voddow',
    region: 'G',
    slug: 'voddow',
    remark: '+ Nieder-Voddow',
  },
  {
    id: 393,
    name: 'Voßberg',
    region: 'W',
    slug: 'vossberg',
  },
  {
    id: 718,
    name: 'Wackerow',
    region: 'G',
    slug: 'wackerow',
  },
  {
    id: 247,
    name: 'Wahlendow',
    region: 'A',
    slug: 'wahlendow',
  },
  {
    id: 71,
    name: 'Wampen',
    region: 'G',
    slug: 'wampen',
  },
  {
    id: 394,
    name: 'Wangelkow',
    region: 'W',
    slug: 'wangelkow',
  },
  {
    id: 395,
    name: 'Warthe',
    region: 'W',
    slug: 'warthe',
  },
  {
    id: 396,
    name: 'Waschow',
    region: 'W',
    slug: 'waschow',
  },
  {
    id: 248,
    name: 'Wegezin',
    region: 'A',
    slug: 'wegezin',
  },
  {
    id: 397,
    name: 'Wehrland',
    region: 'W',
    slug: 'wehrland',
  },
  {
    id: 398,
    name: 'Weiblitz',
    region: 'W',
    slug: 'weiblitz',
  },
  {
    id: 720,
    name: 'Weitenhagen',
    region: 'G',
    slug: 'weitenhagen',
  },
  {
    id: 39,
    name: 'Welzin',
    region: 'W',
    slug: 'welzin',
  },
  {
    id: 400,
    name: 'West-Klüne',
    region: 'W',
    slug: 'west-kluene',
  },
  {
    id: 401,
    name: 'Wilhelmsfelde',
    region: 'W',
    slug: 'wilhelmsfelde',
  },
  {
    id: 402,
    name: 'Wilhelmshof',
    region: 'W',
    slug: 'wilhelmshof',
  },
  {
    id: 24,
    name: 'Wolfradshof',
    region: 'A',
    slug: 'wolfradshof',
  },
  {
    id: 403,
    name: 'Wolgast ',
    region: 'W',
    region: 'wolgast',
  },
  {
    id: 250,
    name: 'Woserow',
    region: 'A',
    slug: 'woserow',
  },
  {
    id: 721,
    name: 'Wrangelsburg',
    region: 'G',
    slug: 'wrangelsburg',
  },
  {
    id: 251,
    name: 'Wusseken',
    region: 'A',
    slug: 'wusseken',
  },
  {
    id: 252,
    name: 'Wussentin',
    region: 'A',
    slug: 'wussentin',
  },
  {
    id: 256,
    name: 'Wussentin-Ausbau',
    region: 'A',
    slug: 'wussentin-ausbau',
  },
  {
    id: 722,
    name: 'Wusterhusen',
    region: 'G',
    slug: 'wusterhusen',
  },
  {
    id: 726,
    name: 'Wusterhusen',
    region: 'G',
    slug: 'wusterhusen-neubauten',
  },
  {
    id: 723,
    name: 'Zarnekow',
    region: 'G',
    slug: 'zarnekow',
  },
  {
    id: 531,
    name: 'Zarnitz',
    region: 'W',
    slug: 'zarnitz',
  },
  {
    id: 253,
    name: 'Zarrentin',
    region: 'A',
    slug: 'zarrentin',
  },
  {
    id: 532,
    name: 'Zecherin',
    region: 'W',
    slug: 'zecherin-bei-usedom',
  },
  {
    id: 533,
    name: 'Zecherin',
    region: 'W',
    slug: 'zecherin-bei-wolgast',
  },
  {
    id: 534,
    name: 'Zemitz',
    region: 'W',
    slug: 'zemitz',
  },
  {
    id: 535,
    name: 'Zempin',
    region: 'W',
    slug: 'zempin',
  },
  {
    id: 536,
    name: 'Ziemitz',
    region: 'W',
    slug: 'ziemitz',
  },
  {
    id: 254,
    name: 'Ziethen',
    region: 'A',
    slug: 'ziethen',
  },
  {
    id: 537,
    name: 'Zinnowitz',
    region: 'W',
    slug: 'zinnowitz',
  },
  {
    id: 255,
    name: 'Zinzow',
    region: 'A',
    slug: 'zinzow',
  },
  {
    id: 538,
    name: 'Zirchow',
    region: 'W',
    slug: 'zirchow',
  },
  {
    id: 724,
    name: 'Züssow',
    region: 'G',
    slug: 'zuessow',
  },
];

const getVillage = slug => {
  return _.findWhere(villages, { slug: slug });
};

export default getVillage;
