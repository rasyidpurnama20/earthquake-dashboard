import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        config.headers["Authorization"] = `Token ${session?.user.accessToken}`;
      }

      return config;
    });
    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
    };
  }, [session]);

  return axiosAuth;
};
