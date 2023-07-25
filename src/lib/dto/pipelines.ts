export type PipelinesResponse = {
  count: number;
  next?: any;
  previous?: any;
  results: Pipeline[];
};

export type TargetPipelinesResponse = {
  count: number;
  next?: any;
  previous?: any;
  results: any[];
};

export type Pipeline = {
  id: number;
  name: string;
  cave: number;
  features_df: string;
  area: string;
  task: number;
  col_filter: string;
  model: number;
  status: number;
  created_at: string;
  updated_at: string;
  m: number;
  b: number;
  c: number;
};

export type CreatePipelinesResponse = {
  id: number;
  name: string;
  cave: number;
  features_df: string;
  area: string;
  task: number;
  col_filter: string;
  model: number;
  status: number;
  created_at: string;
  updated_at: string;
  m: number;
  b: number;
  c: number;
};
