export interface ReportRequest {
  from: '';
  to: '';
}

export interface ReportOneDay {
  date: '';
  count: 0;
}

export interface ReportDay {
  sum: 0;
  average: 0;
  results: ReportOneDay[];
}
