import axios from "@/lib/axios";
import { type DatasetsResponse, type DatasetsUploadResponse } from "@/lib/dto";
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
