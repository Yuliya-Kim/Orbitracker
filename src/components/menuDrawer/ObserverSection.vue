<template>
  <div class="fit column q-gutter-sm">

    <div class="col-auto">
      <div class="text-h6 q-mb-md">Observer's position</div>
    </div>

    <div class="col-auto">
      <div class="text-subtitle q-pb-sm">Coordinates</div>
      <div class="row">
        <div class="col row">
          <VueScrollPicker v-model="observerStore.latitude.degrees" :options="latitudeOptions.degrees" class="col" />
          <VueScrollPicker v-model="observerStore.latitude.minutes" :options="latitudeOptions.minutes" class="col" />
          <VueScrollPicker v-model="observerStore.latitude.seconds" :options="latitudeOptions.seconds" class="col" />
          <VueScrollPicker v-model="observerStore.latitude.hemisphere" :options="latitudeOptions.hemisphere" style="width: 16px;" class="col-auto"/>
        </div>
        <div style="width: 14px;" />
        <div class="col row">
          <VueScrollPicker v-model="observerStore.longitude.degrees" :options="longitudeOptions.degrees" class="col" />
          <VueScrollPicker v-model="observerStore.longitude.minutes" :options="longitudeOptions.minutes" class="col" />
          <VueScrollPicker v-model="observerStore.longitude.seconds" :options="longitudeOptions.seconds" class="col" />
          <VueScrollPicker v-model="observerStore.longitude.hemisphere" :options="longitudeOptions.hemisphere" style="width: 16px;" class="col-auto"/>
        </div>
      </div>
    </div>

    <div class="col-auto">
      <div class="text-subtitle">Elevation</div>
      <div>
        <q-input
          v-model.number="observerStore.elevation"
          type="number"
          class="q-pb-sm full-width"
          color="white"
          suffix="m"
          dense
          dark
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useObserverStore } from 'stores/observer'

const observerStore = useObserverStore()

const latitudeOptions = {
  degrees: Array.apply(null, Array(90)).map(function (x, i) { return { value: i, name: i + ' °' } }),
  minutes: Array.apply(null, Array(60)).map(function (x, i) { return { value: i, name: i + ' \'' } }),
  seconds: Array.apply(null, Array(60)).map(function (x, i) { return { value: i, name: i + ' "' } }),
  hemisphere: ['N', 'S']
}
const longitudeOptions = {
  degrees: Array.apply(null, Array(180)).map(function (x, i) { return { value: i, name: i + ' °' } }),
  minutes: Array.apply(null, Array(60)).map(function (x, i) { return { value: i, name: i + ' \'' } }),
  seconds: Array.apply(null, Array(60)).map(function (x, i) { return { value: i, name: i + ' "' } }),
  hemisphere: ['E', 'W']
}
</script>

<style lang="scss">
.vue-scroll-picker {
  height: 6em !important;

  .vue-scroll-picker-rotator {
    .vue-scroll-picker-item {
      color: #525252;
      &.vue-scroll-picker-item-selected {
        color: #dedede;
        // .degrees::after {
        //   content: '°';
        //   position: absolute;
        //   right: 0;
        // }
      }
    }
  }
  .vue-scroll-picker-layer {
    .vue-scroll-picker-layer-top {
      background: linear-gradient(0deg,#fff0 10%, #1e202b);
    }
    .vue-scroll-picker-layer-bottom {
      background: linear-gradient(0deg,#1e202b 10%, #fff0);
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
