import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Repositories } from "@/plugins/repository-factory";

@Module({
  name: 'memo',
  stateFactory: true,
  namespaced: true
})
export default class Memos extends VuexModule {
  private memos: string[] = ['memo1']

  public get getMemos () {
    return this.memos
  }

  @Mutation
  public add (memo: string) {
    this.memos.push(memo)
  }

  @Mutation
  public remove (id: number) {
    this.memos.splice(id, 1)
  }

  @Action
  /**
   * getData
  */
  public async getData(repositories: Repositories) {
    try {
      const res = await repositories.memo.index<''>()
    } catch (error) {

    }    
  }

}