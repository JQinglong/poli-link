<template>
  <div>
    <div>
      <h3>メール</h3>
      <p>
        <input v-model="email" placeholder="" type="email" />
      </p>
      <h3>パスワード</h3>
      <p>
        <input v-model="password" type="password" />
      </p>
        <button @click="loginBasic()">ログイン</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { SigninWithBasic } from '@/compositions/firebase/auth'
import { injectGlobalState } from '@/compositions/states/user'
export default defineComponent({
  name: 'SigninPage',
  setup(props: any, { root }) {
    // local States
    const email = ref('')
    const password = ref('')

    // Global States
    const userState = injectGlobalState()
    console.log(userState.user)
    // method Functions
    const loginBasic = async () => {
      try {
        const emailValue = email.value
        const passwordValue = password.value
        const currentUser = await SigninWithBasic(emailValue, passwordValue)
        if (currentUser.status === 'ok') {
          const userInfo = currentUser.data.user
          console.log(userState)
          userState.setUserState({
            id: userInfo ? userInfo.uid : '',
            email: userInfo && userInfo.email ? userInfo.email : '',
            name: userInfo && userInfo.displayName ? userInfo.displayName : '',
            thumbnail: userInfo && userInfo.photoURL ? userInfo.photoURL : '',
          })
        }  else {
          alert('ログイン失敗')
        }
        root.$router.push('/')
      } catch (e) {
        alert(e)
      }
    }
    return {
      email,
      password,
      loginBasic,
    }
  },
})
</script>
