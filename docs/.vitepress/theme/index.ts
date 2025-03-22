// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// components
import VPBArchives from './components/VPBArchives.vue'
import VPBTags from './components/VPBTags.vue'
// export { default as VPBArchives } from './components/VPBArchives.vue'

// composables
// export { useArchives } from './composables/useArchives'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('VPBArchives', VPBArchives)
    app.component('VPBTags', VPBTags)
  }
} satisfies Theme
