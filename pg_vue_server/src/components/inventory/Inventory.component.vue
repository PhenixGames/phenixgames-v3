<template class="user-select-none">
  <!-- <section id="logo">
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
        <div class="inv_item">
          <img
            class="drag_items"
            src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-burger-fast-food-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png"
            id="xyz"
            @dragstart="onDrag"
            @click.stop
          />
        </div>
        <div class="inv_item empty"></div>
        <div class="inv_item empty"></div>
        <div class="inv_item empty"></div>
        <div class="inv_item empty"></div>
        <div class="inv_item empty"></div>
        <div class="inv_item empty"></div>
      </div> -->

<draggable class="dragArea list-group w-full" :list="list" @change="log">
  <div
    class="list-styles"
    v-for="element in list"
    :key="element.name"
  >
    {{ element.name }}
  </div>
</draggable>

    <!-- </main>
    <footer>
      <p>Inventar</p>
      <div class="inv_container">
          <div 
          v-for="item in rows_below"
          :key="item"
          class="inv_item empty"
          :id="item"
          @dragover.prevent @drop="drop"
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
  </section> -->
</template>

<script>
import script from "@/assets/js/inventory/index.js";
import DragDrop from 'vue-drag-n-drop'
import test from "./test.vue";

export default {
  name: "pg_inventory",
  data() {
    return {
      drag: false,
      rows_top: 7,
      rows_below: 28,

      stories: [
        {
          title: 'Strategy 101',
          description: 'Create a draft of business plan',
          time: '3 days',
          done: false
        },
        {
          title: 'Strategy 102',
          description: 'Finalize the plan',
          time: '4 days',
          done: false
        },
        {
          title: 'Tech diagram',
          description: 'Draw the tech data',
          time: '4 days',
          done: false
        },
        {
          title: 'Place Holder',
          description: 'Data Science Team',
          time: '5 days',
          done: false
        }
      ],
      dropGroups: [
        {
          name: 'Business Team',
          children: []
        },
        {
          name: 'Tech Dept',
          children: []
        },
        {
          name: 'Marketing Dept',
          children: []
        }
      ]
    };
  },
  components: {
    test,
    DragDrop
  },
  methods: {
      onDrag(ev) {
        ev.dataTransfer.setData("targetId", ev.target.id);
        ev.target.classList.add("empty")
      },
      drop(ev) {
        ev.preventDefault();
        console.log(ev.target)
        const targetId = ev.dataTransfer.getData("targetId");
        ev.target.appendChild(document.getElementById(targetId));

        ev.target.classList.remove("empty")
      }
  },
  mounted() {},
};
</script>

<style scoped>
@import url("@/assets/css/inventory/style.css");
</style>