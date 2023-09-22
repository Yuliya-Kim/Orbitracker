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
                <ol-style-icon :src="positionIcon" :scale="1" :anchor="[0.5, 1]" />
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>

      </ol-map>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useObserverStore } from 'stores/observer'
import { transform } from 'ol/proj'
import positionIcon from '../assets/position.png'

const observerStore = useObserverStore()

const mapRef = ref(null)

const view = ref()
const center = ref([0, 0])
const rotation = ref(0)
const zoom = ref(0)
// const projection = ref('EPSG:4326')
const projection = ref('EPSG:3857')

function coordsDDtoDMS (val, type) {
  const coords = Math.abs(val)
  return {
    degrees: Math.trunc(coords),
    minutes: Math.trunc((coords % 1) * 60),
    seconds: Math.trunc((((coords % 1) * 60) % 1) * 60),
    hemisphere: type === 'lat' ? (val < 0 ? 'S' : 'N') : (val < 0 ? 'W' : 'E')
  }
}

function fixLng (value) {
  value = value % 360
  if (value < -180) {
    value += 360
  }
  if (value > 180) {
    value -= 360
  }
  return value
}

onMounted(() => {
  const map = mapRef.value?.map

  map.getViewport().addEventListener('contextmenu', function (evt) {
    evt.preventDefault()

    const coords = transform(map.getEventCoordinate(evt), 'EPSG:3857', 'EPSG:4326')

    const lat = coordsDDtoDMS(coords[1], 'lat')
    const lng = coordsDDtoDMS(fixLng(coords[0]), 'lng')

    observerStore.latitude.degrees = lat.degrees
    observerStore.latitude.minutes = lat.minutes
    observerStore.latitude.seconds = lat.seconds
    observerStore.latitude.hemisphere = lat.hemisphere

    observerStore.longitude.degrees = lng.degrees
    observerStore.longitude.minutes = lng.minutes
    observerStore.longitude.seconds = lng.seconds
    observerStore.longitude.hemisphere = lng.hemisphere
  })
})
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
