<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card class="mx-auto mt-5">
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" v-model="email"/>
                <v-text-field
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="パスワード"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  v-model="password"
                />
                <v-card-actions>
                  <v-btn class="info" @click="loginBasic()">ログイン</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mx-auto mt-5">
            <v-card-text> google </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { SigninWithBasic } from '@/compositions/firebase/auth';
import { injectGlobalState } from '@/compositions/states/user';
export default defineComponent({
  name: 'SigninPage',
  setup(props: any, { root }) {
    // local States
    const email = ref('');
    const password = ref('');
    const showPassword = false;

    // Global States
    const userState = injectGlobalState();
    console.log(userState.user);
    // method Functions
    const loginBasic = async () => {
      try {
        const emailValue = email.value;
        const passwordValue = password.value;
        const currentUser = await SigninWithBasic(emailValue, passwordValue);
        if (currentUser.status === 'ok') {
          const userInfo = currentUser.data.user;
          console.log(userState);
          userState.setUserState({
            id: userInfo ? userInfo.uid : '',
            email: userInfo && userInfo.email ? userInfo.email : '',
            name: userInfo && userInfo.displayName ? userInfo.displayName : '',
            thumbnail: userInfo && userInfo.photoURL ? userInfo.photoURL : '',
          });
        } else {
          alert('ログイン失敗');
        }
        root.$router.push('/');
      } catch (e) {
        alert(e);
      }
    };
    return {
      email,
      password,
      showPassword,
      loginBasic,
    };
  },
});
</script>
