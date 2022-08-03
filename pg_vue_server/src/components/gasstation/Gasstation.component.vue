<template>
  <div class="gasstation user-select-none">
    <p class="center white bold big">{{ gasstation }}</p>

    <div class="gs_types">
      <div class="gs_button gs_buttons_types cursor-pointer left" :style="(selected_type == 'diesel') ? 'background: rgb(13, 162, 68)': ''"  @click="changeCurrentType('diesel')">
        <p class="center white bold pointer-events-none user-select-none">Diesel
          <br />
          <span class="white">1L / {{ diesel }}$</span>
        </p>
      </div>
      <div class="gs_button gs_buttons_types cursor-pointer left" :style="(selected_type == 'benzin') ? 'background: rgb(13, 162, 68)': ''" @click="changeCurrentType('benzin')">
        <p class="center white bold pointer-events-none user-select-none">Benzin
          <br />
          <span class="white" >1L / {{ benzin }}$</span>
        </p>
      </div>
    </div>

    <div class="gs_cars">
      <p class="center white">Fahrzeuge in der Nähe</p>
      <div class="gs_cars_near">
        <p v-if="cars.length === 0" class="center bold">Keine Fahrzeuge in der Nähe</p>
        <div class="gs_button gs_buttons_cars cursor-pointer left" v-for="car in cars" :data-carid="car.id" :data-max="car.max" :data-fuel_type="car.fuel_type" :style="(selected_type !== car.fuel_type) ? 'cursor: not-allowed' : ''">
          <p class="center white bold">{{car.name}}</p>
        </div>
      </div>
    </div>

    <hr>

    <div class="gs_management display-grid justify-content-center">
      <div class="gs_button cursor-pointer left">
        <p class="center white bold">Management</p>
      </div>
    </div>
  </div>


  <div class="gs_fuel">
    <span class="absolute white">0L</span>
    <span class="absolute white">{{ car_max }}L</span>
    <div class="gs_fuel_range" :style="{ '--min': 0, '--max': car_max, '--val': 0 }">
      <input type="range" id="r" value="0" />
      <output for="r" class="white">0L</output>
    </div>
    <span class="total_price center bold white">{{ current_price }}$</span>
    <button class="gs_button gs_button_fuel cursor-pointer left">
      <p class="center white bold" @click="car_refuel()">Tanken</p>
    </button>
  </div>


</template>

<script>
import range from '@/assets/js/gasstation/range.js';

export default {
  name: "pg_Gasstation",
  data() {
    return {
      gasstation: "Tankstelle XYZ",
      diesel: 0.00,
      benzin: 0.00,
      selected_type: "",
      current_price: "0.00",
      current_fuel: 0, // CURRENT FUEL
      cars: [],
      car: "0", // VEH ID
      car_max: 0, // VEH MAX FUEL
      car_fuel_type: "", // VEH FUEL TYPE
    };
  },
  methods: {
    changeCurrentType(type) {
      this.selected_type = type;
    },
    car_refuel() {
      if (parseInt(this.current_fuel) > parseInt(this.car_max) || parseInt(this.current_fuel) <= 0 || this.car_fuel_type !== this.selected_type) return;

      mp.trigger("carRefuel", this.car, parseInt(this.current_fuel), parseInt(this.current_price));
    },
    initGasStation({
      gasstation_name,
      diesel_price,
      benzin_price,
      cars,
    }) {
      this.gasstation = gasstation_name;
      this.diesel = diesel_price;
      this.benzin = benzin_price;
      this.cars = cars;
    }
  },
  mounted() {
    this.initGasStation({
      gasstation_name: "Tankstelle XYZ",
      diesel_price: 0.00,
      benzin_price: 0.00,
      cars: []
    })
    gui.gasstation = this;

    //mp.trigger('uiInitGasStation')

    setTimeout(() => {
      document.querySelector('.gasstation').style.transform = "translate(0, -50%)"
    }, 400);


    const range = document.getElementById('r');

    range.addEventListener('input', e => {
      const value = range.value;
      this.current_fuel = value;
      this.current_price = (value * this[this.selected_type]).toFixed(2);
    });


    document.querySelectorAll('.gs_buttons_cars').forEach(button => {
      button.addEventListener('click', e => {

        if(this.selected_type == "") return;
        if(button.dataset.fuel_type !== this.selected_type) return;

        var offset = button.offsetTop;
        if (offset > 400) {
          offset = 400;
        }

        const div = document.querySelector('.gs_fuel');
        div.style.transform = "";

        if(button.style.backgroundColor == "rgb(13, 162, 68)") {
          button.style.backgroundColor = "";
          return;
        }

        document.querySelectorAll('.gs_buttons_cars').forEach(button => {
          button.style.backgroundColor = "";
        });
        button.style.backgroundColor = "#0DA244";



        setTimeout(() => {
          div.style.top = (offset - 200) + "px";
          div.style.transform = "translate(290px,300px)";
          this.car = button.dataset.carid;
          this.car_max = button.dataset.max;

          const range = document.getElementById('r');
          range.value = 0;
          range.max = this.car_max;
          this.current_fuel = 0;
          this.current_price = 0;
          this.car_fuel_type = button.dataset.fuel_type;
        }, 300);


      });
    });

  },
};
</script>

<style scoped>
@import url("@/assets/css/gasstation/style.css");
</style>