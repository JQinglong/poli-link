/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Todo from "~/store/todo";
import Memo from "~/store/memo";

let TodoStore: Todo
let MemoStore: Memo
function initialiseStores (store: Store<any>): void {
    TodoStore = getModule(Todo, store)
    MemoStore = getModule(Memo, store)
}

export { initialiseStores, TodoStore, MemoStore}