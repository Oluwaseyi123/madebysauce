import { shallowMount, mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";


describe('Testing formatNumber Method', () => {
  const wrapper = shallowMount(Home);
  wrapper.setData({
         convertedAmount: 500000,
       });
  it('correctly formats the converted number to the conventional format', () => {
    const text = wrapper.find('h1')
      
      wrapper.vm.formatNumber(wrapper.vm.convertedAmount);  // calling component method
      expect(text.text()).toBe('500,000'); 

  })
})