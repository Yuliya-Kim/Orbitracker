import { defineStore } from 'pinia'
import { date } from 'quasar'
import { getCatalogNumber, getSatelliteName, getLatLngObj } from 'tle.js'

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
    },

    getСurrentPosition (tle, i, time) {
      const position = getLatLngObj(tle)
      this.TLEs[i].lng = position.lng
      this.TLEs[i].lat = position.lat
    },

    toggleSatelliteCheck (satellite) {
      const i = this.TLEs.findIndex(sat => sat.catNum === satellite.catNum)
      if (this.TLEs[i].model === true) {
        this.TLEs[i].positionTimer = setInterval(() => {
          this.getСurrentPosition(this.TLEs[i].tle, i, date.formatDate(new Date(), 'X'))
        }, 1000)
      } else {
        clearInterval(this.TLEs[i].positionTimer)
        this.TLEs[i].currentPosition = null
      }
    }
  }
})
