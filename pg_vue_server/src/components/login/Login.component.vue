<template>
    <div class="box-form">
        <div class="left">
            <div class="overlay user-select-none">
                <h1 id="welcome_msg">
                    {{ isLogin ? 'Willkommen zurück' : 'Willkommen Neuling' }}
                </h1>
                <p id="info_text">
                    {{
                        isLogin
                            ? 'Logge dich ein um fortzufahren.'
                            : 'Es sieht so aus als hättest du keinen Account. Bitte erstelle dir vorher einen Account um fortzufahren.'
                    }}
                </p>
            </div>
        </div>

        <div class="right">
            <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
            <p id="error_msg" class="center">
                {{ error_msg }}
            </p>
            <form id="pg_login" @submit="submitForm">
                <div class="inputs">
                    <input
                        id="login"
                        v-model="password"
                        type="password"
                        placeholder="Passwort"
                        :class="isLogin ? '' : 'display-none'"
                    />
                    <br />
                    <span :class="isLogin ? 'display-none' : ''">
                        <input
                            id="register"
                            v-model="password_register"
                            type="password"
                            placeholder="Neues passwort"
                        />
                        <input
                            id="register_repeat"
                            v-model="password_repeat"
                            type="password"
                            placeholder="Passwort wiederholen"
                        />
                    </span>
                </div>

                <br /><br />
                <br />
                <input
                    type="submit"
                    class="cursor-pointer"
                    :value="isLogin ? 'Einloggen' : 'Registrieren'"
                />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pg_Login',
    data() {
        return {
            isLogin: true,
            already: false,
            password: '',
            password_register: '',
            password_repeat: '',
            error_msg: '',
        };
    },
    methods: {
        submitForm(e) {
            e.preventDefault();

            if (this.already) return;
            else this.already = true;

            if (this.isLogin) {
                mp.trigger('uiLogin_LoginButton', this.password);
            } else {
                if (this.password_register !== this.password_repeat) {
                    this.already = false;
                    return (this.error_msg = 'Die Passwörter stimmen nicht überein!');
                } else {
                    mp.trigger('uiRegister_RegisterButton', this.password_register);
                }
            }
        },
        wrongPassword() {
            this.already = false;
            this.password = '';
            this.password_repeat = '';

            return (this.error_msg = 'Das Passwort ist falsch!');
        },
        register() {
            this.isLogin = false;
        },
        initComponent() {
            gui.login = this;
        },
    },
    mounted() {
        if (this.$route.query.isLogin !== 'true') {
            this.isLogin = false;
        }

        this.initComponent();
    },
};
</script>

<style scoped>
@import url('@/assets/css/login/style.css');
</style>
