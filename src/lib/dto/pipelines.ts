/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dataset } from "./datasets";
export type PipelinesResponse = {
  count: number;
  next?: any;
  previous?: any;
  results: Pipeline[];
};

export type AreaPlotResponse = {
  x: number[];
  y: number[];
  z: number[];
  series: number[];
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
  c_: Dataset;
};

export type PipelineTarget = {
  id: number;
  date: string;
  json_result?: any;
  h5_result?: any;
  npy_result: string;
  status: number;
  created_at: string;
  udpated_at: string;
  pipeline_id: Pipeline;
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
