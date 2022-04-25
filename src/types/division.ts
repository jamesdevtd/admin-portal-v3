export interface PoolItemProps {
  name: string;
  numberOfTeam: number;
}

export interface DivisionProps {
  id: number | undefined;
  divisionType: string | undefined;
  makeUp: string | undefined;
  competitionLevel: string | undefined;
  numberOfPools: number | undefined;
  pools: PoolItemProps[] | undefined;
}
