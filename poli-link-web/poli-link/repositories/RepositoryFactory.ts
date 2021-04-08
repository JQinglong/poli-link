import MemoRepository from "./memo2Repository"

const repositories = {
  memo: MemoRepository,
}

export const RepositoryFactory = {
  get: function (name:any) {
    return repositories.memo
  }
}
