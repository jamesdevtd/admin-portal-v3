export interface PoolItemProps {
  name: string;
  numberOfTeams: number;
}

export interface DivisionProps {
  id: number;
  divisionType: string;
  makeUp: string;
  competitionLevel: string;
  numberOfPools: number;
  pools: PoolItemProps[];
  isEdited: boolean;
}

export type DivisionContextType = {
  divisions: DivisionProps[];
  addDivision: (item: DivisionProps) => void;
  updateDivision: (item: DivisionProps) => void;
};
