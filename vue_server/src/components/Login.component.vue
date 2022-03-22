<template>
  <div :class="(show) ? 'box-form' : 'display-none'">
    <div class="left">
      <div class="overlay user-select-none">
        <h1 id="welcome_msg">{{isLogin ? 'Welcome back' : 'Welcome Newbie'}}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
          est sed felis aliquet sollicitudin
        </p>
      </div>
    </div>

    <div class="right">
      <img src="../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
      <span id="error_msg" class="red">
        <!--ERROR MESSAGES-->
        {{error_msg}}
      </span>
      <form id="pg_login" @submit="submitForm">
        <div class="inputs">
          <input id="login" v-model="password" type="password" placeholder="Password" :class="isLogin ? '' : 'display-none'"/>
          <br />
          <span :class="isLogin ? 'display-none' : ''">
            <input
              id="register"
              v-model="password_register"
              type="password"
              placeholder="New password"
            />
            <input
              id="register_repeat"
              v-model="password_repeat"
              type="password"
              placeholder="Repeat new password"
            />
          </span>
        </div>

        <br /><br />
        <br />
        <input type="submit" class="cursor-pointer" value="Login" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PG_Login",
  data() {
    return {
      show: false,
      isLogin: true,
      already: false,
      password: '',
      password_register: '',
      password_repeat: '',
      error_msg: ''
    };
  },
  methods: {
    showLogin() {
      this.show = true
      require('@/assets/css/login/style.css')
    },
    submitForm(e) {
      e.preventDefault();

      if (this.already) return;
      else this.already = true;

      if (this.isLogin) {
        global.mp.trigger('uiLogin_LoginButton', this.password);
      } else {
        if (this.password_register !== this.password_repeat) {
          return this.error_msg = 'Die Passwörter stimmen nicht überein!';
        } else {
          global.mp.trigger('uiRegister_RegisterButton', this.password_register);
        }
      }
    },
    hasNoAccount() {
      this.isLogin = false;
    },
  },
};
</script>

<style scoped>
</style>
