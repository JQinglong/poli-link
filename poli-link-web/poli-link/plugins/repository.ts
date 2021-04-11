// import { MemoRepository } from "@/repositories/memoRepository";

// export interface Repositories {
//   memo: MemoRepository
// }

// export default function( { $axios }: any, inject: any) {
//   const memo = new MemoRepository($axios)
//   const repositories: Repositories = {
//     memo
//   }
//   inject('repositories', repositories)
// }

import { Plugin } from '@nuxt/types'

import createRepository from '@/api/createRepository'

const repository: Plugin = (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx)

  inject('repository', repositoryWithAxios)
}

export default repository