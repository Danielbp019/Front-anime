/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
//import { createVuetify, type ThemeDefinition } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
/* export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})
 */
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      myCustomTheme: {
        colors: {
          primary: '#1e88e5',
          secondary: '#5e35b1',
          info: '#03c9d7',
          success: '#00c853',
          accent: '#FFAB91',
          warning: '#ffc107',
          error: '#f44336',
          lightprimary: '#eef2f6',
          lightsecondary: '#ede7f6',
          lightsuccess: '#b9f6ca',
          lighterror: '#f9d8d8',
          lightwarning: '#fff8e1',
          darkText: '#212121',
          lightText: '#616161',
          darkprimary: '#1565c0',
          darksecondary: '#4527a0',
          borderLight: '#d0d0d0',
          inputBorder: '#787878',
          containerBg: '#eef2f6',
          surface: '#fff',
          'on-surface-variant': '#fff',
          gray100: '#fafafa',
          primary200: '#90caf9',
          secondary200: '#b39ddb'
        },
      },
    },
  },
})
