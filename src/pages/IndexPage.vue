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

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="transform([observerStore.positionDD.longitude, observerStore.positionDD.latitude], 'EPSG:4326', 'EPSG:3857')" />
              <ol-style>
                <ol-style-icon :src="positionIcon" :scale="0.8" :anchor="[0.5, 1]" />
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>

      </ol-map>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useObserverStore } from 'stores/observer'
import { transform } from 'ol/proj'
import positionIcon from '../assets/position.png'

const observerStore = useObserverStore()
// const pos = ref(observerStore.positionDD)

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
