<template>
  <q-layout view="lHr lpR fFf">

    <q-header class="bg-blue-grey-10">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      behavior="desktop"
      side="left"
      :width="340"

      :mini="miniState"
      :mini-width="60"
      @click="miniState = false"
    >
      <q-splitter
        v-model="splitterModel"
        unit="px"
        :limits="[60, 60]"
        separator-class="hidden"
        class="menu-splitter full-height"
      >

        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="menu-tabs"
            switch-indicator
            indicator-color="positive"
            active-color="white"
          >
            <q-tab name="location" icon="fa-solid fa-location-dot" :ripple="false" />
            <q-tab name="satellites" icon="fa-solid fa-satellite" :ripple="false" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            vertical
            keep-alive
            transition-prev="fade"
            transition-next="fade"
            class="menu-panel fit"
          >

            <q-tab-panel name="location" class="fit"></q-tab-panel>

            <q-tab-panel name="satellites" class="fit"></q-tab-panel>

          </q-tab-panels>
        </template>

      </q-splitter>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      behavior="desktop"
      side="right"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.set(true)

const leftDrawerOpen = ref(true)
const miniState = ref(false)
const rightDrawerOpen = ref(false)

const tab = ref('satellites')
const splitterModel = ref(60)

function toggleLeftDrawer () {
  miniState.value = !miniState.value
}
function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

// const miniState = ref(true)

// function drawerClick (e) {
//   if (miniState.value) {
//     miniState.value = false
//     e.stopPropagation()
//   }
// }
</script>

<style lang="scss">
.menu-tabs {
  background: #292c38;
  .q-tab {
    color: #727892;
    &:hover {
      color: white !important;
      opacity: 1;
    }
  }
  .q-tab__indicator {
    width: 4px;
  }

  .q-focus-helper, .q-focus-helper::before, .q-focus-helper::after {
    width: 0 !important;
  }
}

.menu-panel {
  background: #1e202b;
}
</style>
