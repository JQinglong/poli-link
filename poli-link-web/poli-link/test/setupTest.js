import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)


jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    useContext: jest.fn().mockReturnValue({
      route: {
        value: {
          fullPath: '_fullPath_',
        },
      },
      query: {
        value: undefined,
      },
      from: {
        value: undefined,
      },
      params: {
        value: undefined,
      },
    }),
  }
});