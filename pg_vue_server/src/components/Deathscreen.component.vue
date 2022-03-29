<template>
  <div class="wrapper white">
    <div class="logo left">
      <img src="../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
    </div>
    <div class="header">
      <h1>Pass das nächste mal besser auf!</h1>
    </div>
    <div class="quotes center">
      <span id="quotes"></span>
    </div>
    <hr />
    <div class="loading"></div>
    <div class="revivebutton">
      <button id="revive" @click="revive">Lasse dich vom Notartzt abholen</button>
    </div>
  </div>
</template>


<script>
import quote from '@/assets/js/deathscreen/quote.js';

export default {
  name: "pg_deathscreen",
  data() {
    return {
    };
  },
  methods: {
      revive() {
        mp.trigger('HTML:Call:Respawn');
      }
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
    );
    document.head.appendChild(externalScript);

    setInterval(() => {
      var ele = document.querySelector(".loading");
      var style = window.getComputedStyle(ele, ":before").width;
      var revivebutton = document.getElementById("revive");
      if (style == "1523.19px") {
        ele.style.opacity = "0";
        revivebutton.style.display = "block";
        setTimeout(() => {
          revivebutton.style.opacity = "1";
        }, 100);
      }
      //DEBUG -- DELETE ON PROD
      ele.style.opacity = "0";
      revivebutton.style.display = "block";
      revivebutton.style.opacity = "1";
    }, 500);

    gui.deathscreen = this;
  },
};
</script>

<style scoped>
@import url("@/assets/css/deathscreen/style.css");
</style>