import createRepositries, { CRUDActions } from '@/repositories/repository'

export interface Repositories {
  memo: CRUDActions
}

export default (context: any, inject: any) => {
  // const repositoryWithAxios = createRepositries(context.$axios)
  // const repositories = {
  //   memo: repositoryWithAxios('memo')
  // }
  // inject('repositories', repositories)
}
