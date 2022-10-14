<template>
    <header>
        <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
    </header>
    <main>
        <div class="spawnchooser cursor-pointer" @click="chooseSpawn(0)">
            <div class="spawnchooser_icon">
                <img src="../../assets/img/spawnchooser/house_icon.png" />
            </div>
            <div class="spawnchooser_txt">
                <span>Dein Haus</span>
            </div>
            <div class="spawnchooser_bg">
                <img src="../../assets/img/spawnchooser/red_stripe.png" />
            </div>
        </div>

        <div class="spawnchooser cursor-pointer" @click="chooseSpawn(1)">
            <div class="spawnchooser_icon">
                <img src="../../assets/img/spawnchooser/house_icon.png" />
            </div>
            <div class="spawnchooser_txt">
                <span>Letzte Position</span>
            </div>
            <div class="spawnchooser_bg">
                <img src="../../assets/img/spawnchooser/red_stripe.png" />
            </div>
        </div>

        <div class="spawnchooser cursor-pointer" @click="chooseSpawn(2)">
            <div class="spawnchooser_icon">
                <img src="../../assets/img/spawnchooser/house_icon.png" />
            </div>
            <div class="spawnchooser_txt">
                <span>Flughafen</span>
            </div>
            <div class="spawnchooser_bg">
                <img src="../../assets/img/spawnchooser/red_stripe.png" />
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'pg_spawnchooser',
    data() {
        return {};
    },
    methods: {
        chooseSpawn(type) {
            mp.trigger('Player:Spawn', type);
        },
    },
};
</script>

<style scoped>
@import url('@/assets/css/spawnchooser/style.css');
</style>
