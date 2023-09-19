<template>
  <div class="fit column q-gutter-sm">

    <div class="col-auto">
      <div class="text-h6 q-mb-md">Satellites</div>
    </div>

    <div class="col-auto">
      <q-input
        v-model="satellitesListFilter"
        class="q-pb-sm"
        placeholder="Search"
        filled
        dense
        dark
      >
        <template v-slot:append>
          <q-icon name="fa-solid fa-magnifying-glass" size="xs" />
        </template>
      </q-input>
    </div>

    <div class="col">
      <q-scroll-area v-if="satellitesStore.TLEs.length" class="full-height">
        <q-list>
          <q-item
            v-for="sat in satellitesStore.TLEs" :key="sat.catNum"
            @click="sat.model = !sat.model, satellitesStore.toggleSatelliteCheck(sat)"
            clickable
            class="q-px-none"
            dense
          >
            <q-item-section side>
              <q-checkbox v-model="sat.model" @click="satellitesStore.toggleSatelliteCheck(sat)" color="positive" dense dark />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ sat.name }}</q-item-label>
              </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div v-else class="fit flex justify-center items-center">
        <q-spinner-tail color="cyan" size="3em" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useSatellitesStore } from 'stores/satellites'

const satellitesStore = useSatellitesStore()

const satellitesListFilter = ref('')

onMounted(() => {
  satellitesStore.getSatellitesList()
})
</script>

<style>

</style>
