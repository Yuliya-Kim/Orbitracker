import { defineStore } from 'pinia'
import { getCatalogNumber, getSatelliteName } from 'tle.js'

export const useSatellitesStore = defineStore('satellites', {
  state: () => ({
    loading: true,
    TLEs: [],
    selectedSatellite: null,
    previousOrbit: [],
    currentOrbit: [],
    nextOrbit: []
  }),

  getters: {
    checkedSatellites (state) {
      return state.TLEs.filter(sat => sat.model === true)
    }
  },

  actions: {
    async getSatellitesList () {
      const fs = require('fs')
      const readline = require('readline')

      this.loading = true

      const fileStream = fs.createReadStream('TLEs/stations.txt')
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })

      const lines = []
      for await (const line of rl) {
        lines.push(line)
      }

      const tlesArr = []
      for (let i = 0; i < lines.length; i = i + 3) {
        const tle = `${lines[i]}\n${lines[i + 1]}\n${lines[i + 2]}`
        tlesArr.push({
          tle,
          model: false,
          catNum: getCatalogNumber(tle),
          name: getSatelliteName(tle),
          positionTimer: null,
          lng: null,
          lat: null,
          groundTracks: null
        })
      }

      this.TLEs = tlesArr
      this.loading = false
    }
  }
})
