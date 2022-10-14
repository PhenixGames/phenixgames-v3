<template class="user-select-none">
    <section id="logo">
        <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
    </section>
    <section id="inventar" class="user-select-none">
        <header class="cursor-pointer" id="close_inv">
            <span> <img src="../../assets/img/inventory/arrrow-left-30.png" /> </span>
            <span>Verlassen/Zur&uuml;ck</span>
        </header>
        <main>
            <p>Ausgerüstetes Equipment</p>
            <div class="inv_container">
                <div
                    v-for="row in rows_top"
                    :key="row"
                    class="inv_item empty"
                    :id="'top_pos_' + row"
                    data-isstackable=""
                ></div>
            </div>
        </main>
        <footer>
            <p>Inventar</p>
            <div class="inv_container">
                <div
                    v-for="row in rows_below"
                    :key="row"
                    class="inv_item empty"
                    :id="'bottom_pos_' + row"
                    data-isstackable=""
                ></div>
            </div>
        </footer>
    </section>

    <section id="inv_slot">
        <p>Test</p>
    </section>

    <section id="inv_char">
        <div class="inv_char_img">
            <img src="../../assets/img/inventory/inv_char.svg" />
        </div>
        <div class="inv_char_items"></div>
    </section>
</template>

<script>
import script from '@/assets/js/inventory/index.js';

export default {
    name: 'pg_inventory',
    data() {
        return {
            inv_items: {},
            rows_top: 7,
            rows_below: 28,
        };
    },
    methods: {
        //invPos, img, count, isStackable
        insertItemsIntoInv({ item }) {
            if (item === []) return;

            for (let i in item) {
                let invPost = item[i].invPos;
                let img = item[i].img;
                let count = item[i].count;
                let isTop = item[i].isTop;
                let isStackable = item[i].isStackable;

                let itemDiv;

                isTop
                    ? (itemDiv = document.getElementById('top_pos_' + invPost))
                    : (itemDiv = document.getElementById('bottom_pos_' + invPost));
                let innerDiv = document.createElement('div');
                if (itemDiv.classList.contains('empty')) {
                    itemDiv.classList.remove('empty');
                    itemDiv.classList.add('full');
                    itemDiv.dataset.isstackable = isStackable;

                    innerDiv.innerHTML = `<img src="${img}" />`;
                    if (isStackable) {
                        innerDiv.innerHTML += `<span>${count}</span>`;
                    }
                } else {
                    if (isStackable) {
                        let span = innerDiv.querySelector('span');
                        span.innerHTML = parseInt(span.innerHTML) + count;
                        span.classList.add('no-drag');
                    }
                }
                itemDiv.append(innerDiv);
            }
        },
    },
    mounted() {
        //mp.trigger('uiInitInventory')

        this.insertItemsIntoInv({
            item: [
                {
                    invPos: 1,
                    img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
                    count: 1,
                    isTop: true,
                    isStackable: true,
                },
                {
                    invPos: 1,
                    img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
                    count: 1,
                    isTop: false,
                    isStackable: false,
                },
            ],
        });

        gui.inventory = this;
    },
};
</script>

<style scoped>
@import url('@/assets/css/inventory/style.css');
</style>
