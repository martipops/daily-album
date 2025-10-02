import 'vue'
import * as icons from 'ionicons/icons'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $icons: typeof icons
  }
}
