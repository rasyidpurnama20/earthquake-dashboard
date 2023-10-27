/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/lib/axios";
import {
  type TargetPipelinesResponse,
  type CreatePipelinesResponse,
  type PipelinesResponse,
  type Pipeline,
  type AreaPlotResponse,
} from "@/lib/dto";
import { type AxiosResponse } from "axios";

export const pipelinesService = {
  async getPipelines({ token }: { token: string }) {
    const response: AxiosResponse<PipelinesResponse> = await axios.get(
      `/pipelines/`,
      {
        params: {
          per_page: 100,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },

  async getPlot({
    token,
    plot,
    feature,
    date,
    id,
  }: {
    token: string;
    plot: string;
    feature?: string;
    date: string;
    id: string;
  }) {
    const response: AxiosResponse<AreaPlotResponse[]> = await axios.get(
      `/pipelines/${id}/plot/`,
      {
        params: {
          plot: plot,
          feature: feature,
          date: date,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },

  async getFeaturePipelines({ id, token }: { id: string; token: string }) {
    const response: AxiosResponse<any> = await axios.get(
      `/pipelines/${id}/get-features/`,
      {
        params: {
          per_page: 100,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },

  async getDatePipelines({ id, token }: { id: string; token: string }) {
    const response: AxiosResponse<any> = await axios.get(
      `/pipelines/${id}/get-date/`,
      {
        params: {
          per_page: 100,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },

  async getTargetPipelines({ id, token }: { id: string; token: string }) {
    const response: AxiosResponse<TargetPipelinesResponse> = await axios.get(
      `/pipelines/${id}/target/`,
      {
        params: {
          per_page: 100,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  async getTargetPipelinesById({
    id,
    targetId,
    token,
  }: {
    id: string;
    targetId: string;
    token: string;
  }) {
    const response: AxiosResponse<any> = await axios.get(
      `/pipelines/${id}/target/${targetId}/}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  async createPrediction({ token, form }: { token: string; form: FormData }) {
    const response: AxiosResponse<CreatePipelinesResponse> = await axios.post(
      `/pipelines/`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  async createPredictionTarget({
    id,
    token,
    form,
  }: {
    id: string;
    token: string;
    form: FormData;
  }) {
    const response: AxiosResponse<CreatePipelinesResponse> = await axios.post(
      `/pipelines/${id}/target/`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  async removePipelinesById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<any> = await axios.delete(
      `/pipelines/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  async removePipelinesTargetById({
    token,
    id,
  }: {
    token: string;
    id: string;
  }) {
    const response: AxiosResponse<any> = await axios.delete(
      `/pipelines/${id}/target/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  async getPipelinesById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<Pipeline> = await axios.get(
      `/pipelines/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return response;
  },
  // async getPipelinesViewById({ token, id }: { token: string; id: string }) {
  //   const response: AxiosResponse<ViewPipelinesResponse> = await axios.get(
  //     `/pipelines/${id}/view/`,
  //     {
  //       params: {
  //         per_page: 100,
  //       },
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     }
  //   );

  //   return response;
  // },

  // async updatePipelines({
  //   token,
  //   form,
  //   id,
  // }: {
  //   token: string;
  //   form: FormData;
  //   id: string;
  // }) {
  //   const response: AxiosResponse<PipelinesUploadResponse> = await axios.put(
  //     `/pipelines/${id}/`,
  //     form,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Token ${token}`,
  //       },
  //     }
  //   );

  //   return response;
  // },
};
