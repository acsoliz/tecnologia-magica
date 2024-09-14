import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {throwExpression} from "@/src/Utils";

/*********************************************************************************
 * PROPORCIONA un manejador para realizar peticiones HTTP a la API.
 * UTILIZA Axios para realizar las peticiones
 * DEFINE funciones para GET, POST, PUT y DELETE. 
 * MANEJA y CLASIFICA ERRORES de la API en tipos específicos de errores para una 
   mejor gestión.
 *********************************************************************************/

// Define un enumerado para clasificar los tipos de errores de API
export enum ErrorKind{
    UndefinedError,
    InvalidCredentials,
    UserAlreadyExists,
    InvalidConfirmationCode,
    InvalidToken,
    ProjectSameNameAlreadyExists
}

// Crea un mapa para relacionar mensajes de error con el tipo de error de API correspondiente
const ErrorKindMap = new Map<string, ErrorKind>([
    ['Invalid credentials', ErrorKind.InvalidCredentials],
    ['Username already exists', ErrorKind.UserAlreadyExists],
    ['Invalid token', ErrorKind.InvalidToken],
]);

// Define una clase personalizada para errores de API 
export class APIError extends Error {
    public readonly kind : ErrorKind

    constructor(kind: ErrorKind) {
        super();
        Object.setPrototypeOf(this, APIError.prototype);
        if (Error.captureStackTrace) Error.captureStackTrace(this, APIError);
        this.name = 'APIError';
        this.kind = kind
    }
}

    // Metodo principal para manejar peticiones a la API
export default class ApiRequestHandler{
    public readonly ApiUrl: string

    constructor() {
        this.ApiUrl = process.env.NEXT_PUBLIC_APP_URL ?? throwExpression("App url is not set")
    }

    private getHeadersConfig(userToken?: string): AxiosRequestConfig {
        return {
            headers: {
                'Content-Type': 'application/json',
                ...(userToken ? { 'Authorization': `${userToken}` } : {})
            }
        };
    }
    
    // Maneja peticiones HTTP de tipo GET, POST, PUT y DELETE
    private async handleRequest<T, R>(
        method: 'get' | 'post' | 'put' | 'delete',
        endpoint: string,
        params: T,
        userToken?: string
    ): Promise<R> {
        const headersConfig = this.getHeadersConfig(userToken); 
        let result;
        try {
            switch (method) {
                case 'get':
                    result = await axios.get<R>(
                        new URL(endpoint, this.ApiUrl).href, 
                     { ...headersConfig, params }
                    );
                    break;
                case 'post':
                    result = await axios.post<R>(
                        new URL(endpoint, this.ApiUrl).href, 
                        params, 
                        headersConfig
                    );
                    break;
                case 'put':
                    result = await axios.put<R>(
                        new URL(endpoint, this.ApiUrl).href,
                        params,
                        headersConfig
                    );
                    break;
                case 'delete':
                    result = await axios.delete<R>(new URL(
                        endpoint, this.ApiUrl).href,
                     { ...headersConfig, data: params }
                );
                    break;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError = error;

                if (axiosError.response && axiosError.response.status !== 200 && axiosError.response.data) {
                    const response = axiosError.response.data as string;
                    const errorKind = ErrorKindMap.get(response) ?? ErrorKind.UndefinedError;
                    throw new APIError(errorKind);
                }
            }
            throw new APIError(ErrorKind.UndefinedError);
        }
        if (result.status >= 300 || result.status < 200) throw new APIError(ErrorKind.UndefinedError);
        return result.data;
    }

    public getRequest<T, R>(endpoint: string, params: T, userToken: string): Promise<R> {
        return this.handleRequest('get', endpoint, params, userToken);
    }

    public postRequest<T, R>(endpoint: string, body: T, userToken?: string): Promise<R> {
        return this.handleRequest('post', endpoint, body, userToken);
    }
    public putRequest<T, R>(endpoint: string, body: T, userToken?: string): Promise<R> {
        return this.handleRequest('put', endpoint, body, userToken);
    }

    public deleteRequest<T, R>(endpoint: string, params: T, userToken: string): Promise<R> {
        return this.handleRequest('delete', endpoint, params, userToken);
    }


}
