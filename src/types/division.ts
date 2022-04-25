export interface PoolItemProps {
  name: string;
  numberOfTeams: number;
}

export interface DivisionProps {
  id: number | undefined;
  divisionType: string | undefined;
  makeUp: string | undefined;
  competitionLevel: string | undefined;
  numberOfPools: number | undefined;
  pools: PoolItemProps[] | undefined;
}
