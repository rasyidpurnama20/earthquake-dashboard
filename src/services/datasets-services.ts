import axios from "@/lib/axios";
import {
  type DetailDatasetsResponse,
  type DatasetsResponse,
  type DatasetsUploadResponse,
  type ViewDatasetsResponse,
  type RangeUpdateDataResponse,
} from "@/lib/dto";
import { type AxiosResponse } from "axios";

export const datasetsService = {
  async getDatasets({
    token,
    cave,
    type,
  }: {
    token: string;
    cave?: string;
    type?: string;
  }) {
    const response: AxiosResponse<DatasetsResponse> = await axios.get(
      `/datasets/`,
      {
        params: {
          cave,
          type,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },
  async getDatasetsById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<DetailDatasetsResponse> = await axios.get(
      `/datasets/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },
  async getDatasetsViewById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<ViewDatasetsResponse> = await axios.get(
      `/datasets/${id}/view/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },
  async removeDatasetsById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<DetailDatasetsResponse> = await axios.delete(
      `/datasets/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },
  async uploadDatasets({ token, form }: { token: string; form: FormData }) {
    const response: AxiosResponse<DatasetsUploadResponse> = await axios.post(
      `/datasets/`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },
  async updateDatasets({
    token,
    form,
    id,
  }: {
    token: string;
    form: FormData;
    id: string;
  }) {
    const response: AxiosResponse<DatasetsUploadResponse> = await axios.put(
      `/datasets/${id}/`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },

  async getRangeUpdateData({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<RangeUpdateDataResponse> = await axios.get(
      `/datasets/${id}/history-range-date/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response;
  },
};
