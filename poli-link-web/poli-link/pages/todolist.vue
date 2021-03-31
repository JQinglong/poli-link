<template>
    <div>
        todo
        <input v-model="state.todo" placeholder="taskを入力してください">
        <button @click="addTodo">追加</button>
        <br>
        <li v-for="(todo, index) in todolist" :key="index">
          {{ todo }}
          <button @click="removeTodo(index)">delete</button>
        </li>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import { TodoStore } from '~/store'

interface Todo {
  todo: string
}

export default defineComponent({
  setup () {
    const state = reactive<Todo>({
      todo: ''
    })
    const todos = TodoStore
    const todolist = computed(() => todos.getTodos)

    const addTodo = () => {
      console.log(state.todo)
      todos.add(state.todo)
      state.todo = ''
    }
    const removeTodo = (index: number) => {
      todos.remove(index)
    }

    return {
      state, todolist, addTodo, removeTodo
    }
  }
})

</script>