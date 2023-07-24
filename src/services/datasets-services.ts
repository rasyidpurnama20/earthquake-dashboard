import axios from "@/lib/axios";
import {
  type DetailDatasetsResponse,
  type DatasetsResponse,
  type DatasetsUploadResponse,
} from "@/lib/dto";
import { type AxiosResponse } from "axios";

export const datasetsService = {
  async getDatasets({ token }: { token: string }) {
    const response: AxiosResponse<DatasetsResponse> = await axios.get(
      `/datasets/`,
      {
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
  async removeDatasetsById({ token, id }: { token: string; id: number }) {
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
};
