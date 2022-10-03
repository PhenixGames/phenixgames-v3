<template>
  <div class="gasstation user-select-none">
    <section class="gs_notfound center white" v-if="notFound">
      <h1>404</h1>
      <h3>Diese Tankstelle wurde nicht gefunden</h3>
      <h6 class="red">Bitte kontaktiere den Support!</h6>
    </section>
    <section v-else>
      <p class="center white bold big">{{ gasstation }}</p>
      <div class="gs_types">
        <div class="gs_button gs_buttons_types cursor-pointer left"
          :style="(selected_type.toLowerCase() == 'diesel') ? 'background: rgb(13, 162, 68)': '' "
          @click='changeCurrentType("diesel")'>
          <p class="center white bold pointer-events-none user-select-none">Diesel
            <br />

            <span class="white">1L / {{ diesel }}$</span>
          </p>
        </div>
        <div class="gs_button gs_buttons_types cursor-pointer left"
          :style="(selected_type.toLowerCase()  == 'benzin') ? 'background: rgb(13, 162, 68)': '' "
          @click='changeCurrentType("benzin")'>
          <p class="center white bold pointer-events-none user-select-none">Benzin
            <br />
            <span class="white">1L / {{ benzin }}$</span>
          </p>
        </div>
      </div>

      <div class="gs_cars">
        <p class="center white">Fahrzeuge in der Nähe</p>
        <div class="gs_cars_near">
          <p v-if="cars.length === 0" class="center bold">Keine Fahrzeuge in der Nähe</p>
          <div class="gs_button gs_buttons_cars cursor-pointer left center white gs_button_cars_notactive"
            v-for="car in cars" :data-carid="car.id" :data-max="car.max" :data-fuel_type="car.type" :data-fuel="car.fuel"
            :style="(selected_type.toLowerCase() !== car.type.toLowerCase() ) ? 'cursor: not-allowed' : 'background: #FE550D;'"
            @click="carClick">

            <span><strong>Name:</strong> {{car.name}}</span>
            <span><strong>Tank:</strong> {{car.fuel.toFixed(0)}}L</span>

          </div>
        </div>
      </div>

      <hr>

      <div class="gs_management display-grid justify-content-center">
        <div class="gs_button cursor-pointer left">
          <p class="center white bold">Management</p>
        </div>
      </div>

      <div class="gs_fuel">
        <span class="absolute white">0L</span>
        <span class="absolute white">{{ car_max }}L</span>
        <div class="gs_fuel_range" :style="{ '--min': 0, '--max': car_max, '--val': 0 }">
          <input type="range" id="r" value="0" min="{{car_fuel}}" max="{{fuel_max}}" />
          <output for="r" class="white">0L</output>
        </div>
        <span class="total_price center bold white">{{ current_price }}$</span>
        <button class="gs_button gs_button_fuel cursor-pointer left">
          <p class="center white bold" @click="car_refuel">Tanken</p>
        </button>
      </div>
    </section>
  </div>


</template>

<script>
import range from '@/assets/js/gasstation/range.js';

export default {
  name: "pg_Gasstation",
  data() {
    return {
      gasstation: "",
      diesel: 0.00,
      benzin: 0.00,
      selected_type: "",
      current_price: "0.00",
      current_fuel: 100, // CURRENT FUEL
      cars: [],
      car: "0", // VEH ID
      car_max: 0, // VEH MAX FUEL
      car_fuel: 0,
      car_fuel_type: "", // VEH FUEL TYPE,
      notFound: false,
    };
  },
  methods: {
    changeCurrentType(type) {
      this.selected_type = type;
    },
    car_refuel() {
      if (parseInt(this.current_fuel) > parseInt(this.car_max) || parseInt(this.current_fuel) <= 0 || this.car_fuel_type !== this.selected_type.toLowerCase()) return;

      mp.trigger("carRefuel", this.car, parseInt(this.current_fuel), parseInt(this.current_price));
    },
    initGasStation(items) {
      items = JSON.parse(items);
      this.gasstation = items.name;
      this.diesel = items.diesel_price;
      this.benzin = items.benzin_price;
      this.cars = items.cars;
    },
    initComponent() {
      gui.gasstation = this;
    },
    gasstationNotFound() {
      return (this.notFound = true);
    },
    carClick(evt) {
      evt = evt.target;
      if (this.selected_type == "") return;
      if (evt.dataset.fuel_type.toLowerCase() !== this.selected_type) return;

      var offset = evt.offsetTop;
      if (offset > 400) {
        offset = 400;
      }

      const div = document.querySelector('.gs_fuel');
      div.style.transform = "";

      if (evt.style.backgroundColor == "rgb(13, 162, 68)") {
        evt.style.backgroundColor = "";
        return;
      }

      evt.style.backgroundColor = "#0DA244";



      setTimeout(() => {
        div.style.top = (offset - 200) + "px";
        div.style.transform = "translate(300px,150px)";
        this.car = evt.dataset.carid;
        this.car_max = evt.dataset.max;
        this.car_fuel = evt.dataset.fuel.toFixed(0);

        const range = document.getElementById('r');
        range.value = 0;
        range.max = this.car_max;
        this.current_fuel = 0;
        this.current_price = 0;
        this.car_fuel_type = evt.dataset.fuel_type;
      }, 300);
    }
  },
  mounted() {
    setTimeout(() => {
      document.querySelector('.gasstation').style.transform = "translate(0, -50%)"
    }, 400);

    const range = document.getElementById('r');
    range.addEventListener('input', e => {
      const value = range.value;
      this.current_fuel = value;
      this.current_price = (value * this[this.selected_type]).toFixed(2);
    });

    this.initComponent();
    mp.trigger('uiInitGasStation');
  }
};
</script>

<style scoped>
@import url("@/assets/css/gasstation/style.css");
</style>