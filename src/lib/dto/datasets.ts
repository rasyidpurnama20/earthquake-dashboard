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

export type ViewDatasetsResponse = {
  count: number;
  next: string;
  previous?: any;
  results:
    | ViewBlastingDatasetsResultsResponse[]
    | ViewCatalogDatasetsResultsResponse[]
    | ViewMuckingDatasetsResultsResponse[];
};

export type ViewDatasetsResultsResponse = {
  index: number;
  datetime: string;
  k0: number;
  k1: number;
  k2: number;
  bound: string;
};

export type DatasetsUploadResponse = Dataset;

export type ViewBlastingDatasetsResultsResponse = {
  date: string;
  time: string;
  x: number;
  y: number;
  z: number;
};

export type ViewCatalogDatasetsResultsResponse = {
  date: string;
  time: string;
  northing: number;
  easting: number;
  depth: number;
  moment_magnitude: number;
  "es/ep_ratio": number;
  apparent_stress: number;
  energy_index: number;
  apparent_volume: number;
};

export type ViewMuckingDatasetsResultsResponse = {
  date: string;
  x: number;
  y: number;
  z: number;
  tons: number;
};
