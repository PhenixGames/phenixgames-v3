<template>
    <Login />
</template>

<script>
import Login from '../../components/login/Login.component.vue';
export default {
    name: 'pg_login',
    components: {
        Login
    },
    mounted() {
        gui.Login = Login;
    }
}
</script>