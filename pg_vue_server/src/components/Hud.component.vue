<template>
  <section class="top_right">
    <img src="../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
    <div class="id">
      <span></span>
      <span id="player_id">{{ player_id }}</span>
    </div>
    <div class="time">
      <span></span>
      <span id="time">{{time}}</span>
    </div>
  </section>

  <section class="voice">
    <img src="../assets/img/hud/speak.png" v-if="voiceType"/>
    <img src="../assets/img/hud/muted.png" v-if="!voiceType"/>
  </section>
  
  <section class="speedometer white" v-if="showSpeedo">
    <div class="veh_tank">
      <span id="tank">{{ tank }}</span>
      <span>Liter</span>
      <img src="../assets/img/hud/tank.svg" />
    </div>
    <div class="veh_state">
      <div class="car_info">
        <img src="../assets/img/hud/car.svg" class="car" />
        <img src="../assets/img/hud/lock.svg" class="car_lock" />
      </div>
      <div class="car_heal">
        <img src="../assets/img/hud/warning.svg" />
        <img src="../assets/img/hud/error.svg" />
      </div>
      <div class="engine_state">
        <img src="../assets/img/hud/lamp.svg" />
        <img src="../assets/img/hud/engine.svg" />
      </div>
    </div>
    <div class="veh_speed">
      <img src="../assets/img/hud/speed.svg" />
      <span id="speed">{{ speed }}</span>
      <span>km/h</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "pg_hud",
  data() {
      return {
          voiceType: false,
          showSpeedo: false,
          tank: 0,
          speed: 0,
          veh_state: {},
          player_id: '0',
          time: ''
      }
  },
  methods: {
      manageVoice(type) {
          /**
           * type 1 = speak
           * type 0 = mute
           */
          this.voiceType = (type) ? true : false;
      },
      showSpeedometer() {
          this.showSpeedo = true
      },
      removeSpeedometer() {
          this.showSpeedo = false
      },
      setSpeedometer(tank, speed, veh_state) {
          this.tank = tank;
          this.speed = speed;

          //TODO
          //Implement veh_state (locked, engine broken, etc)
      },
      setPlayerId(player_id) {
          this.player_id = player_id
      }
  },
  mounted() {
      setInterval(() => {
          let currentDate = new Date();
          let hr = currentDate.getHours();
          let min = currentDate.getMinutes();
          if(hr <= 9) {
              hr = '0'+hr;
          }
          if(min <= 9) {
              min = '0'+min
          }
          this.time = hr + ':' + min
      }, 1000);    
      
      gui.hud = this;
  }
}
</script>

<style scoped>
@import url("@/assets/css/hud/style.css");
</style>