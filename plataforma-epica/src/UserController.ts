import ApiRequestHandler from "@/src/ApiRequestHandler";
import { profileInfo } from "./types/types";

/*****************************************************************************************
 * CONTIENE metodos para llamar a las API relacionadas con datos del usuario.
 * REQUIERE el metodo `ApiRequestHandler` para manejar las solicitudes HTTP.
*****************************************************************************************/

const client = new ApiRequestHandler()

export abstract class UserController {

	public static async Login(username: string, password: string): Promise<{ userToken: string }> {
		return await client.postRequest('/api/auth/login',
			{
				username: username,
				password: password
			})
	}

	public static async FetchProfileInfo(userToken: string, userId?:string): Promise<profileInfo> {
		const requestUrl = `/api/users/info/${userId || ''}`; 
		return await client.getRequest(requestUrl,{},userToken)
	}
}