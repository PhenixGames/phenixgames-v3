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


  <section class="money absolute display-flex align-items-center">
    <img src="../assets/img/hud/money.png" />
    <span class="white bold">{{money}}</span>
  </section>
  
  <section class="speedometer white" v-if="showSpeedo">
    <div class="display-flex">
      <div class="veh_tank">
        <span id="tank">{{ tank }}</span>
        <span>L</span>
        <img src="../assets/img/hud/fuel.png" />
      </div>
      <div class="veh_speed">
        <img src="../assets/img/hud/speed.png" />
        <span id="speed">{{ speed }}</span>
        <span>km/h</span>
      </div>
    </div>
    <div class="veh_state absolute">
      <div class="car_info">
        <img src="../assets/img/hud/car.svg" class="car" />
        <img src="../assets/img/hud/lock.svg" :style="{stateActive: carLocked}"  v-if="carLocked"/>
        <img src="../assets/img/hud/lock.svg" :style="{stateActive: !carLocked}" v-else/>
      </div>
      <div class="car_heal">
        <img src="../assets/img/hud/warning.svg" :style="{stateActive: CarWarning}" />
        <img src="../assets/img/hud/error.svg" :style="{stateActive: CarError}"/>
      </div>
      <div class="engine_state">
        <img src="../assets/img/hud/lamp.svg" :style="{stateActive: lightsOn}" />
        <img src="../assets/img/hud/engine.svg" :style="{stateActive: enigneOn}" />
      </div>
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
          carStates: {
              lightsOn: false,
              enigneOn: false,
              carLocked: false,
              CarWarning: false,
              CarError: false
          },
          tank: 10,
          speed: 10,
          veh_state: {},
          player_id: '0',
          time: '',
          money: '0'
      }
  },
  methods: {
      manageVoice(type) {
          /**
           * type 1 = speak
           * type 0 = mute
           */
          this.voiceType = type;
      },
      showSpeedometer() {
          this.showSpeedo = true;
          setTimeout(() => {
            document.querySelector('.speedometer').style.bottom = "15px";  
          }, 100);
      },
      removeSpeedometer() {
          this.showSpeedo = false
      },
      setSpeedometer(tank, speed, veh_state) {
          this.tank = tank;
          this.speed = speed;
      },
      setPlayerId(player_id) {
          this.player_id = player_id
      },
      /**
      * @param {Number} money
      */
      setMoney(money) {
        //Convert money from 10000 to 10.000
        this.money = Number(parseFloat(parseInt(money)).toFixed(2)).toLocaleString('de', {
            minimumFractionDigits: 0
        });
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