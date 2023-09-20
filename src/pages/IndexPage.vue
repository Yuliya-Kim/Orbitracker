<template>
  <q-page>
    <div style="height: calc(100vh - 50px);">
      <ol-map
        ref="mapRef"
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        class="map"
      >
        <ol-view
          ref="view"
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />

        <ol-tile-layer className="map__map-source-layer">
          <ol-source-osm />
        </ol-tile-layer>

      </ol-map>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const mapRef = ref(null)

const view = ref()
const center = ref([0, 0])
const rotation = ref(0)
const zoom = ref(0)
// const projection = ref('EPSG:4326')
const projection = ref('EPSG:3857')

</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;

  .map__map-source-layer {
    filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
  }

  .ol-attribution {
    display: none;
  }
}
</style>
