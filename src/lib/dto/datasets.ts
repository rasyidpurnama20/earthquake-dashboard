export type Dataset = {
  id: number;
  name: string;
  file: string;
  start_date: string;
  end_date: string;
  count: number;
  features: string;
  rev: number;
  created_at: string;
  updated_at: string;
  modified: boolean;
};

export type DatasetsResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Dataset[];
};

export type DetailDatasetsResponse = {
  id: number;
  name: string;
  cave: number;
  type: number;
  file: string;
  start_date: string;
  end_date: string;
  count: number;
  features: string;
  rev: number;
  created_at: string;
  updated_at: string;
  modified: boolean;
};

export type DatasetsUploadResponse = Dataset;
