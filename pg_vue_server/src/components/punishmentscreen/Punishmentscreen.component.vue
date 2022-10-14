<template>
    <div class="punishment">
        <div class="ps_logo">
            <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
        </div>

        <div class="punishment_info center bold">
            <h3 class="red big">Dein Konto wurde gesperrt</h3>
            <p>
                <p class="white">
                  Adminname: <i>{{adminname}}</i>
                </p>
                <p class="white">
                  Grund: <i>{{reason}}</i>
                </p>
                <p class="white">
                  Verbleibende Zeit: <i>{{time_left}}</i>
                </p>
                <p class="white">
                  Datum der Sperrung: <i>{{date_of_punishment}}</i>
                </p>
                <p class="white">
                  Punishment ID: <i>{{punishment_id}}</i>
                </p>
            </p>
        </div>
    </div>
    <span style="opacity: 0; pointer-events: none; user-select: none">X</span>
</template>

<script>
export default {
  name: "PG_Punishmentscreen",
  data() {
    return {
      adminname: "",
      reason: "",
      time_left: "",
      date_of_punishment: "",
      punishment_id: ""
    };
  },
  mounted () {
    gui.punishmentscreen = this;
    const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    console.log(new Date().toLocaleDateString('de-DE', options));
  },
  methods: {
    initPunishmentscreen({
        adminname,
        reason,
        time_left,
        date_of_punishment,
        punishment_id
    }) {
        this.adminname = adminname;
        this.reason = reason;
        this.time_left = time_left;
        this.date_of_punishment = date_of_punishment;
        this.punishment_id = punishment_id;
    }
  },
};
</script>

<style scoped>
@import url("@/assets/css/punishmentscreen/punishmentscreen.css");
</style>