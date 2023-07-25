import axios from "@/lib/axios";
import {
  // type DetailPipelinesResponse,
  type PipelinesResponse,
  // type PipelinesUploadResponse,
  // type ViewPipelinesResponse,
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
  // async getPipelinesById({ token, id }: { token: string; id: string }) {
  //   const response: AxiosResponse<DetailPipelinesResponse> = await axios.get(
  //     `/pipelines/${id}`,
  //     {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     }
  //   );

  //   return response;
  // },
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
  // async removePipelinesById({ token, id }: { token: string; id: string }) {
  //   const response: AxiosResponse<DetailPipelinesResponse> = await axios.delete(
  //     `/pipelines/${id}`,
  //     {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     }
  //   );

  //   return response;
  // },
  // async uploadPipelines({ token, form }: { token: string; form: FormData }) {
  //   const response: AxiosResponse<PipelinesUploadResponse> = await axios.post(
  //     `/pipelines/`,
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
