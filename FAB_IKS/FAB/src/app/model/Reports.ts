export interface ReportRequest {
  from: '';
  to: '';
}

export interface Reportday {
  date: '';
  count: 0;
}

export interface ReportDay {
  sum: 0;
  average: 0;
  results: Reportday[];
}

export interface Reportkm {
  date: '';
  count: 0;
}

export interface ReportKm {
  sum: 0;
  average: 0;
  results: Reportkm[];
}

export interface Reportmoney {
  date: '';
  count: 0;
}

export interface ReportMoney {
  sum: 0;
  average: 0;
  results: Reportmoney[];
}
