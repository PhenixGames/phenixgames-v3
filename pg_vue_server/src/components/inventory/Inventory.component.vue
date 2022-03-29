<template class="user-select-none">
    <section id="logo">
        <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg">
    </section>
    <section id="inventar">
        <header class="cursor-pointer" id="close_inv">
            <span> <img src="../../assets/img/inventory/arrrow-left-30.png"> </span>
            <span>Verlassen/Zur&uuml;ck</span>
        </header>
        <main>
            <p>Ausgerüstetes Equipment</p>
            <div class="inv_container">
                <div class="inv_item">
                    <img class="drag_items" src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-burger-fast-food-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png" draggable="true"/>
                </div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
            </div>
        </main>
        <footer>
            <p>Inventar</p>
            <div class="inv_container">
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
                <div class="inv_item empty"></div>
            </div>
        </footer>
    </section>

    <section id="inv_slot">
        <p>Test</p>
    </section>

    <section id="inv_char">
        <div class="inv_char_img">
            <img src="../../assets/img/inventory/inv_char.svg">
        </div>
        <div class="inv_char_items">
            
        </div>
    </section>
</template>

<script>

import script from '@/assets/js/inventory/index.js';

export default {
    name: 'pg_inventory',
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        
    }
}
</script>

<style scoped>
@import url('@/assets/css/inventory/style.css');
</style>