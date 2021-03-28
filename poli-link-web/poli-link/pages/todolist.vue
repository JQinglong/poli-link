<template>
    <div>
        todo
        <logo />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import { TodoStore } from '~/store'
import Logo from '~/components/Logo.vue'

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