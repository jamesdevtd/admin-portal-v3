interface PoolItemProps {
  name: string;
  numberOfTeam: number;
}

export default interface ContactDetails {
  id: number;
  divisionType: string;
  makeUp: string;
  competitionLevel: string;
  numberOfPools: number;
  pools: PoolItemProps[];
}
