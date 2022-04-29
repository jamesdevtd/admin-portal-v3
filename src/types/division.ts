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
  playerFee: PlayerFeeItemProps | undefined;
}

export type DivisionContextType = {
  divisions: DivisionProps[];
  addDivision: (item: DivisionProps) => void;
  updateDivision: (item: DivisionProps) => void;
};

export interface PlayerFeeItemProps {
  divisionId: number;
  isFree: boolean;
  fee: number | null;
}
