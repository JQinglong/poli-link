import { MemoRepository } from "@/repositories/memoRepository";

export interface Repositories {
  memo: MemoRepository
}

export default function( { $axios }: any, inject: any) {
  const memo = new MemoRepository($axios)
  const repositories: Repositories = {
    memo
  }
  inject('repositories', repositories)
}