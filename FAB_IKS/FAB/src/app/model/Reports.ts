export interface ReportRequest {
  from: string;
  to: string;
}

export interface Reportday {
  date: string;
  count: number;
}

export interface ReportDay {
  sum: number;
  average: number;
  results: Reportday[];
}

export interface Reportkm {
  date: string;
  count: number;
}

export interface ReportKm {
  sum: number;
  average: number;
  results: Reportkm[];
}

export interface Reportmoney {
  date: string;
  count: number;
}

export interface ReportMoney {
  sum: number;
  average: number;
  results: Reportmoney[];
}
