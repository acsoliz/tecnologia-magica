"use client"
import { useState } from "react";
import { useRequest } from "ahooks";
import { APIError, ErrorKind } from "@/src/ApiRequestHandler";

interface UseLoginProps {
  loginFunction: (username: string, password: string) => Promise<{ userToken: string }>;
  onSuccess: (jwtToken: string) => void;
}

export function useLogin({ loginFunction, onSuccess }: UseLoginProps) {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [undefinedError, setUndefinedError] = useState(false);

  const { loading: loginInProgress, run: login } = useRequest(
    async (params: { email: string; password: string }) => {
      return await loginFunction(params.email, params.password);
    },
    {
      manual: true,
      loadingDelay: 300,
      onError: (e) => {
        const eC = e as APIError;
        switch (eC.kind) {
          case ErrorKind.InvalidCredentials:
            setInvalidCredentials(true);
            break;
          case ErrorKind.UndefinedError:
            setUndefinedError(true);
            break;
        }
      },
      onSuccess: (result: { userToken: string }) => {
        onSuccess(result.userToken);
      },
    }
  );

  return {
    loginInProgress,
    login,
    invalidCredentials,
    undefinedError,
  };
}
