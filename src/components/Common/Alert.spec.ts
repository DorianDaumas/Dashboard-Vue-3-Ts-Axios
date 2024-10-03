import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import Alert from '@/components/Common/Alert.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

describe('<Alert></Alert>', () => {
  it('Affiche le composant alert', () => {
    const vuetify = createVuetify({
      components,
      directives
    })
    const wrapper = shallowMount(Alert, {
      global: {
        plugins: [vuetify]
      },
      shallow: true
    })
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="container-alert">
        <v-alert-stub type="error" border="false" closable="false" closeicon="$close" closelabel="$vuetify.close" modelvalue="true" prominent="false" density="default" tile="false" tag="div" variant="tonal"></v-alert-stub>
      </div>"
    `)
  })
})
