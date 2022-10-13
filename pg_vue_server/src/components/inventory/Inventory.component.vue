<template class="user-select-none">
  <section id="logo">
    <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
  </section>
  <section id="inventar" class="user-select-none">
    <header class="cursor-pointer" id="close_inv">
      <span>
        <img src="../../assets/img/inventory/arrrow-left-30.png" />
      </span>
      <span>Verlassen/Zur&uuml;ck</span>
    </header>
    <main>
      <p>Ausgerüstetes Equipment</p>
      <div class="inv_container">
        <div v-for="row in rows_top" :key="row" class="inv_item empty" :id="`top_pos_${row}`" data-isstackable="false"
          data-itemid=""></div>
      </div>
    </main>
    <footer>
      <p>Inventar</p>
      <div class="inv_container">
        <div v-for="row in rows_below" :key="row" class="inv_item empty" :id="`bottom_pos_${row}`"
          data-isstackable="false" data-itemid="">
        </div>
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
import script from "@/assets/js/inventory/index.js";

export default {
  name: "pg_inventory",
  data() {
    return {
      inv_items: {},
      rows_top: 7,
      rows_below: 28,
    };
  },
  methods: {
    //invPos, img, count, isStackable, itemId
    insertItemsIntoInv({ item = [] }) {
      if (item.length === 0) return;

      for (let i in item) {
        const invPost = item[i].invPos;
        const img = item[i].img;
        const count = item[i].count || 1;
        const isTop = item[i].isTop || false;
        const isStackable = item[i].isStackable || false;
        const itemId = item[i].itemId;


        const itemDiv = (isTop) ? document.getElementById(`top_pos_${invPost}`) : document.getElementById(`bottom_pos_${invPost}`);

        const innerDiv = document.createElement('div');

        if (itemDiv.classList.contains('empty')) {

          itemDiv.dataset.isstackable = isStackable;
          itemDiv.dataset.amount = count;
          itemDiv.dataset.itemid = itemId;

          itemDiv.classList.remove('empty');
          itemDiv.classList.add('full');

          innerDiv.innerHTML = `<img src="${img}" />`;

          const amountSpan = document.createElement('span');
          amountSpan.innerText = `${count}`;
          amountSpan.classList.add('no-drag');
          innerDiv.appendChild(amountSpan);

        } else {
          const existingSpan = itemDiv.querySelector('span');

          if(!isStackable) return;
          if(itemDiv.dataset.itemid !== itemId) return;
          
          existingSpan.innerHTML = parseInt(existingSpan.innerHTML) + count;
          existingSpan.classList.add('no-drag');
          innerDiv.remove();
        }

        itemDiv.append(innerDiv)
      }
    },
    saveItems() {
      const items = document.querySelectorAll('.inv_item.full');

      const itemsArr = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const divId = items[i].id;

        const isTop = divId.includes('top_pos_');
        const invPos = divId.split('_')[2];
        const isStackable = item.dataset.isstackable;
        const itemId = item.dataset.itemid;
        const amount = item.dataset.amount;

        itemsArr.push({
          isTop,
          invPos,
          isStackable,
          itemId,
          amount
        });
      }

      //mp.trigger('saveInventory', JSON.stringify(itemsArr));
    },
    
  },
  mounted() {
    try {
      mp.trigger('uiInitInventory');
    } catch (err) { }

    this.insertItemsIntoInv({
      item: [{
        invPos: 1,
        img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
        count: 1,
        isTop: true,
        isStackable: true,
        itemId: "1"
      }, {
        invPos: 1,
        img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
        count: 1,
        isTop: false,
        isStackable: false,
        itemId: "1"
      },{
        invPos: 2,
        img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
        count: 1,
        isTop: true,
        isStackable: true,
        itemId: "1"
      }
    ]
    });

    gui.inventory = this;
  },
};
</script>

<style scoped>
@import url("@/assets/css/inventory/style.css");
</style>