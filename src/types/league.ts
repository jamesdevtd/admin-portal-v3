export interface LeagueProps {
  id: number;
  leagueName: string;
  status: string; // approve/deny
  country: string;
  affiliateName: string;
  totalEvents: number;
  nextEvent: string; // string($date-time)
  totalStaff: number;
  customFees: string;

  isSanctioned: boolean;
  championshipQualifier: boolean;
}