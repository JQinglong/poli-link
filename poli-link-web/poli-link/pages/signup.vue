<template>
  <div class="container">
    <div class="card">
      <h3>メール</h3>
      <p class="my-input">
        <input v-model="email" placeholder="" type="email" />
      </p>
      <h3>パスワード</h3>
      <p class="my-input">
        <input v-model="password" type="password" />
      </p>
      <h3>パスワード（確認用）</h3>
      <p class="my-input">
        <input v-model="passwordVerify" type="password" />
      </p>
       <nuxt-link to="/signin">ログインページに戻る</nuxt-link>
      <p class="my-input">
        <button @click="signUpBasic()">アカウント登録</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { SignUpWithBasic } from '@/compositions/firebase/auth'
import { injectGlobalState } from '@/compositions/states/user'

export default defineComponent({
  name: 'SignUpPage',
  setup(props: any, { root }) {
    // TODO: この部分を reactive で実装したほうがいいかもしれない
    const email = ref('')
    const password = ref('')
    const passwordVerify = ref('')

    const userState = injectGlobalState()

    const signUpBasic = () => {
      if (password.value !== passwordVerify.value) {
        alert('パスワードが違います。')
      } else {
        const emailValue = email.value
        const passwordValue = password.value
        SignUpWithBasic(emailValue, passwordValue)
          .then((createdUser) => {
            console.log(createdUser)
            if (createdUser.status === 'ok') {
              const userInfo = createdUser.data.user
              userState.setUserState({
                id: userInfo ? userInfo.uid : '',
                email: userInfo && userInfo.email ? userInfo.email : '',
                name:
                  userInfo && userInfo.displayName ? userInfo.displayName : '',
                thumbnail:
                  userInfo && userInfo.photoURL ? userInfo.photoURL : '',
              })
              root.$router.push('/');
            } else {
              alert('アカウント登録失敗')
            }
          })
          .catch(() => {
            alert('エラーが発生しました')
          })
      }
    }
    return {
      email,
      password,
      passwordVerify,
      signUpBasic,
    }
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
