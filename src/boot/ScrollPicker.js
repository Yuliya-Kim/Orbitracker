import { boot } from 'quasar/wrappers'
import VueScrollPicker from 'vue-scroll-picker'

import 'vue-scroll-picker/lib/style.css'

export default boot(({ app }) => {
  app.use(VueScrollPicker)
})
