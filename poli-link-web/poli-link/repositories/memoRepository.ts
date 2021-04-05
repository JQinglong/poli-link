import { NuxtAxiosInstance } from "@nuxtjs/axios";

type queryData = {
  q: string | null
}

export class MemoRepository {
  private readonly axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.axios = $axios
  }

  createResource(apiVersion: Number) {
    // return `v${apiVersion}/memo`
    return 'http://localhost:8000/api/memo'
  }

  get(data: queryData, version = 1) {
    // const uri = `${this.createResource(version)}/search`
    const uri = `${this.createResource(version)}/`
    return this.axios.$get(uri, {
      params: { ...data }
    })
  }
}