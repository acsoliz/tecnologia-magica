// incidents\hooks\useIncidentLoader.ts

import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { APIError, ErrorKind } from "@/src/ApiRequestHandler";
import { IncidentController, Incidents } from "@/src/IncidentController";
import { getCookie } from "cookies-next";

// hook to load and handle incidents
export function useIncidentLoader(
  currentPage: number,
  status?: string,
  assignment?: string

) {
  const [incidents, setIncidents] = useState<Incidents[]>([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [undefinedError, setUndefinedError] = useState(false);

  const { loading, error, run: loadIncidents } = useRequest(
    async () => {
      return await IncidentController.GetIncidents(
        getCookie("userToken") as string,
        currentPage,
        10,
        status,
        assignment
      );
    },
    {
      refreshDeps: [currentPage, status, assignment],
      onError: (e) => {
        const eC = e as APIError;
        if (eC.kind === ErrorKind.UndefinedError) {
          setUndefinedError(true);
        }
      },
      onSuccess: (result) => {
        setIncidents(result.incidents.sort((a, b) => a.title.localeCompare(b.title)));
        setTotalIncidents(result.totalItems);
        setUndefinedError(false);
      }
    }
  );

  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);

  return { incidents, totalIncidents, loading, error, loadIncidents, undefinedError };
}
