import MemoRepository from "./memo2Repository"

const repositories = {
  memo: MemoRepository,
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
