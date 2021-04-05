import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AxiosResponse } from "axios";

export interface CRUDActions {
  index<T>(query?: string): Promise<AxiosResponse<T>>
  show<T>(id: number): Promise<AxiosResponse<T>>
  create<T>(payload: any): Promise<AxiosResponse<T>>
  update<T>(payload: any, id?: number): Promise<AxiosResponse<T>>
  delete<T>(id?: number): Promise<AxiosResponse<any>>
}

export default (client: NuxtAxiosInstance) => (resource: string) => ({
  index<T>(query?: string) {
    return client.get<T>(`api/${resource}?${query}`)
  },
  show<T>(id: number) {
    return client.get<T>(`api/${resource}/${id}`)
  },
  create<T>(payload: any) {
    return client.post<T>(`api/${resource}`, payload)
  },
  update<T>(payload: any, id?: number) {
    return client.patch<T>(resourcePath(resource, id), payload)
  },
  delete(id?: number) {
    return client.delete(resourcePath(resource, id))
  }
})

const resourcePath = (resource: string, id?: number) => {
  let path
  if (id) {
    path = `http://localhost:8000/api/${resource}/${id}`
  } else {
    path = `http://localhost:8000/api/${resource}`
  }
  return path
}