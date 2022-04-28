export interface PoolItemProps {
  id: number;
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
  isValidated: boolean;
}

export type DivisionContextType = {
  divisions: DivisionProps[];
  addDivision: (item: DivisionProps) => void;
  updateDivision: (item: DivisionProps) => void;
};
