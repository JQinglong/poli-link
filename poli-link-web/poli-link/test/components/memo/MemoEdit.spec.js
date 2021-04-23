import { createLocalVue, mount } from '@vue/test-utils'
import MemoEdit from '@/components/memo/MemoEdit.vue'
import Vuetify from 'vuetify'

describe('MemoEdit', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('is a Vue instance', () => {
    // console.log(MemoEdit.arguments)

    const wrapper = mount(MemoEdit, {
      localVue,
      vuetify
    })
    // console.log('wrapper.html', wrapper.html())
    // console.log('wrapper.find', wrapper.find('.v-card__title').text())
    const title = wrapper.find('.v-card__title')
    expect(title.text()).toBe('メモ の管理')

  })

  it('MemoEdit event', () => {
    const wrapper = mount(MemoEdit, {
      localVue,
      vuetify
    })
    const event = jest.fn()
    const button  = wrapper.find('.v-btn')
    console.log('button', button.html())

    wrapper.vm.$on('action-btn:clicked', event)
    // expect(event).toHaveBeenCalledTimes(0)
    // button.trigger('click')
    // expect(event).toHaveBeenCalledTimes(1)

  })

})
