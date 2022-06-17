<template>
    <div class="punishment">
        <div class="ps_logo">
            <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
        </div>

        <div class="punishment_info center bold">
            <h3 class="red">Dein Konto wurde gesperrt</h3>
            <p>
                <p class="white">Adminname: <i>{{adminname}}</i></p>
                <p class="white">Grund: <i>{{reason}}</i></p>
                <p class="white">Verbleibende Zeit: <i>{{time_left}}</i></p>
                <p class="white">Datum der Sperrung: <i>{{date_of_punishment}}</i></p>
            </p>
        </div>
    </div>
    <span style="opacity: 0; pointer-events: none; user-select: none">X</span>
</template>

<script>
export default {
  name: "PG_Login",
  data() {
    return {
      adminname: "Mittelblut9",
      reason: "RDM",
      time_left: "156",
      date_of_punishment: "07.06.2022 22:57",
    };
  },
  mounted () {
    gui.punishment = this;
  },
  methods: {

  },
};
</script>

<style scoped>
@import url("@/assets/css/punishmentscreen/punishmentscreen.css");
</style>