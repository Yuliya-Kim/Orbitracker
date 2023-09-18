import { defineStore } from 'pinia'
// import { getCatalogNumber, getSatelliteName } from 'tle.js'

export const useObserverStore = defineStore('observer', {
  state: () => ({
    latitude: {
      degrees: 54,
      minutes: 46,
      seconds: 58,
      hemisphere: 'N'
    },
    longitude: {
      degrees: 32,
      minutes: 2,
      seconds: 43,
      hemisphere: 'E'
    },
    elevation: 250
  }),

  getters: {
    //
  },

  actions: {
    //
  }
})
