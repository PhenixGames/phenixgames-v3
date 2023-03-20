<template>
    <h1>Wir sind gerade in Wartung</h1>
    <h2>Nachricht des Teams: {{ reason }}</h2>
</template>

<script>
export default {
    name: 'pg_spawnchooser',
    data() {
        return {
            reason: '',
        };
    },
    methods: {
        init(reason) {
            this.reason = reason;
        },
    },

    mounted() {
        gui.wartung = this;
    },
};
</script>

<style scoped>
@import url('@/assets/css/wartung/style.css');
</style>
