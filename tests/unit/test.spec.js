import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import App from '../../src/App.vue'

describe('App.vue', () => {
  it('should be successful', () => {
    fetch.mockResponseOnce(JSON.stringify({
      londonTemp: '12345'
    }))
    const wrapper = shallowMount(App, {
      stubs: ['md-tabs', 'md-tab', 'md-dialog-alert']
    });

    wrapper.setData({
      employer: {number: 10},
      employee: {number: 10}
    })
    wrapper.findComponent({ref: 'btn-employer'}).trigger('click');
    wrapper.findComponent({ref: 'btn-employee'}).trigger('click');
    expect(wrapper.vm.modalSuccess).toBe('Success')
    
    wrapper.setData({
      employer: {number: 100},
      employee: {number: 10}
    })
    wrapper.findComponent({ref: 'btn-employer'}).trigger('click');
    wrapper.findComponent({ref: 'btn-employee'}).trigger('click');
    expect(wrapper.vm.modalSuccess).toBe('Success')
  });

  it('should fail', () => {
    fetch.mockResponseOnce(JSON.stringify({
      londonTemp: '12345'
    }))
    const wrapper = shallowMount(App, {
      stubs: ['md-tabs', 'md-tab', 'md-dialog-alert']
    });

    wrapper.setData({
      employer: {number: 9},
      employee: {number: 10}
    })
    wrapper.findComponent({ref: 'btn-employer'}).trigger('click');
    wrapper.findComponent({ref: 'btn-employee'}).trigger('click');
    expect(wrapper.vm.modalSuccess).toBe('Transaction failed')
  });
});

describe('Input', () => {
  it('renders an input placeholder', () => {
    const wrapper = shallowMount(Input, {
      propsData: {
        placeholder: 'test',
        value: {
          number: 10
        }
      },
      stubs: ['md-input', 'md-field']
    })
    expect(wrapper.props().placeholder).toBe('test')
  })
})

describe('Button', () => {
  it('renders a button placeholder', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        text: 'test'
      },
      stubs: ['md-button', 'md-field']
    })
    expect(wrapper.props().text).toBe('test')
  })
})