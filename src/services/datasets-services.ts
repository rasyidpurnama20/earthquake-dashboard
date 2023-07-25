import axios from "@/lib/axios";
import {
  type DetailDatasetsResponse,
  type DatasetsResponse,
  type DatasetsUploadResponse,
  type ViewDatasetsResponse,
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
          per_page: 100,
          cave,
          type,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
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
      }
    );

    return response;
  },
  async getDatasetsViewById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<ViewDatasetsResponse> = await axios.get(
      `/datasets/${id}/view/`,
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
  async removeDatasetsById({ token, id }: { token: string; id: string }) {
    const response: AxiosResponse<DetailDatasetsResponse> = await axios.delete(
      `/datasets/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
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
      }
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
      }
    );

    return response;
  },
};
