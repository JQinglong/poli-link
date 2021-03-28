import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'todo',
  stateFactory: true,
  namespaced: true
})
export default class Todos extends VuexModule {
  private todos: string[] = ['task1']

  public get getTodos () {
    return this.todos
  }

  @Mutation
  public add (todo: string) {
    this.todos.push(todo)
  }

  @Mutation
  public remove (id: number) {
    this.todos.splice(id, 1)
  }
}