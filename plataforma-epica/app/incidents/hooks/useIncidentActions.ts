"use client"
import { getCookie } from "cookies-next";
import { useRequest } from "ahooks";
import { message } from "antd";
import { IncidentController } from "@/src/IncidentController"; // Ajusta la ruta según sea necesario

export function useIncidentActions(refreshIncidents: () => void) {
  const userToken = getCookie("userToken") as string;


  // Asignar la incidencia al usuario actual
  const { loading: assigningIncident, run: handleAssignIncident } = useRequest(
    async (incidentId: number) => {
      await IncidentController.AssignIncident(userToken, incidentId);
      message.success("Te has asignado esta incidencia");
      refreshIncidents(); // Refrescar la lista de incidencias
    },
    {
      manual: true,
      onError: async () => {
        await message.error("Error al asignar la incidencia");
      },
    }
  );

  // Cambiar el estado de la incidencia
  const { loading: updatingIncidentStatus, run: handleUpdateIncidentStatus } = useRequest(
    async (incidentId: number, newStatus: string) => {
      await IncidentController.UpdateIncident(userToken, newStatus, incidentId);
      message.success(`Estado cambiado a ${newStatus}`);
      refreshIncidents(); // Refrescar la lista de incidencias
    },
    {
      manual: true,
      onError: async () => {
        await message.error("Error al cambiar el estado");
      },
    }
  );

  return {
    handleAssignIncident,
    handleUpdateIncidentStatus,
    assigningIncident,
    updatingIncidentStatus,
  };
}
