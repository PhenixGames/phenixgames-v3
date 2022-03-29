<template class="user-select-none">
  <section id="logo">
    <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
  </section>
  <section id="inventar">
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
          />
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
          <div 
          v-for="item in rows_below"
          :key="item"
          class="inv_item empty"
          ondragover="allowDrop"
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
import script from "@/assets/js/inventory/index.js";

export default {
  name: "pg_inventory",
  data() {
    return {
      drag: false,
      rows_top: 7,
      rows_below: 28,
    };
  },
  methods: {
      allowDrop(e) {
        e.preventDefault();
      },
      drag(e) {
        e.dataTransfer.setData("text", ev.target.id);
      },
      drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
      }
  },
  mounted() {},
};
</script>

<style scoped>
@import url("@/assets/css/inventory/style.css");
</style>