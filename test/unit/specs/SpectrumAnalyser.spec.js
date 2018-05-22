import { mount } from '@vue/test-utils';
import Component from '@/components/SpectrumAnalyser';

describe('SpectrumAnalyser', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Component);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('emits an error and doesn’t render when initialization fails', () => {
    const wrapper = mount(Component);
    expect(wrapper.emitted().error).toBeTruthy();
    expect(wrapper.html()).toBeFalsy();
  });

  it('renders when there’s a valid spectrum', () => {
    const wrapper = mount(Component);
    wrapper.setData({ spectrum: new Uint8Array(null) });
    expect(wrapper.html()).toMatch(/canvas/);
  });

  it('calculates points based on the frequency spectrum', () => {
    const wrapper = mount(Component);
    wrapper.setData({ spectrum: new Uint8Array([127, 0, 255, 127]) });
    const expected = [[0, 63.74901960784314], [128, 0], [256, 128], [384, 63.74901960784314]];
    expect(wrapper.vm.points).toEqual(expect.arrayContaining(expected));
  });
});
