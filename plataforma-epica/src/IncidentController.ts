import ApiRequestHandler from "@/src/ApiRequestHandler";

/************************************************************************************
* PROPORCIONA métodos con EndPoints de API para gestionar incidentes.
* REQUIERE la clase `ApiRequestHandler` para manejar solicitudes y devoluciones HTTP
  listas paginadas de incidentes como respuesta.
*************************************************************************************/


const client = new ApiRequestHandler()

export type Incidents = {
	id: number;
	title: string;
	status: string;
	priority: string;
	assignedTo: number;
	createdAt: string;
	updatedAt: string;
	assignedUser: {
		id: number,
		username: string
	}
}


export abstract class IncidentController {


	public static async GetIncidents(
		userToken: string,
		page: number = 1,
		limit: number = 10,
		status?: string,
		assignment?: string
	): Promise<{ incidents: Incidents[], totalItems: number }> {

		// Configuración de los parámetros de la consulta
		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
			...(status ? { status } : {}),
			...(assignment ? { assignment } : {}),
		});

		// Realizar la solicitud GET utilizando getRequest
		return await client.getRequest(`/api/incidents?${params.toString()}`, {}, userToken);
	}



	public static async UpdateIncident(
		userToken: string,
		status: string,
		incidentId: number,
		userId?: number
	): Promise<{ incidents: Incidents[], totalItems: number }> {
		const bodyObj = userId ?  {status , userId} : {status}
		return await client.putRequest(`/api/incidents/update/${incidentId}`, bodyObj, userToken);
	}


	public static async AssignIncident(
		userToken: string,
		incidentId: number,
		userId?: number
	): Promise<{ incidents: Incidents[], totalItems: number }> {
		return await client.putRequest(`/api/incidents/assign/${incidentId}`, {userId}, userToken);
	}


	


}
