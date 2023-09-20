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
    positionDD (state) {
      const lat = state.latitude.degrees + state.latitude.minutes / 60 + state.latitude.seconds / 3600
      const lng = state.longitude.degrees + state.longitude.minutes / 60 + state.longitude.seconds / 3600
      return {
        latitude: state.latitude.hemisphere === 'N' ? lat : -lat,
        longitude: state.longitude.hemisphere === 'E' ? lng : -lng
      }
    }
  },

  actions: {
    //
  }
})
