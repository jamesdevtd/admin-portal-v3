export const adultMakeups = ['mens', 'ladies', 'mixed'];
export const adultLevels = ['social', 'competitive'];

export const youthMakeups = ['boys', 'girls', 'mixed'];
export const youthLevels = [
  '8 and under',
  '9 and under',
  '10 and under',
  '11 and under',
  '12 and under',
  '13 and under',
  '14 and under',
];

export const divisionNumberOfTeams = [4, 6, 8];

export const starterDivisions = [
  {
    id: 1,
    divisionType: 'youth',
    makeUp: 'boy',
    competitionLevel: '12 and under',
    numberOfPools: 3,
    playerFee: {
      divisionId: 1,
      isFree: false,
      fee: 12,
    },
    pools: [
      {
        id: 1,
        name: 'Pool 1',
        numberOfTeams: 8,
      },
      {
        id: 2,
        name: 'Pool 2',
        numberOfTeams: 8,
      },
      {
        id: 3,
        name: 'Pool 3',
        numberOfTeams: 8,
      },
    ],
    isEdited: false,
    isValidated: true,
  },
  {
    id: 2,
    divisionType: 'youth',
    makeUp: 'mixed',
    competitionLevel: '8 and under',
    numberOfPools: 2,
    playerFee: {
      divisionId: 2,
      isFree: false,
      fee: 31,
    },
    pools: [
      {
        id: 1,
        name: 'Pool 1',
        numberOfTeams: 8,
      },
      {
        id: 2,
        name: 'Pool 2',
        numberOfTeams: 8,
      },
    ],
    isEdited: false,
    isValidated: true,
  },
  {
    id: 3,
    divisionType: 'youth',
    makeUp: 'mixed',
    competitionLevel: '8 and under',
    numberOfPools: 1,
    playerFee: {
      divisionId: 3,
      isFree: false,
      fee: 17,
    },
    pools: [
      {
        id: 1,
        name: 'Pool 1123123',
        numberOfTeams: 8,
      },
    ],
    isEdited: false,
    isValidated: true,
  },
];
// TODO: fetch this data under /static using getStaticProps
