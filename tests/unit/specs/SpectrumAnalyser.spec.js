import { mount } from '@vue/test-utils';
import SpectrumAnalyser from '@/components/SpectrumAnalyser';

describe('SpectrumAnalyser', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SpectrumAnalyser);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('emits an error and doesn’t render when initialization fails', () => {
    const wrapper = mount(SpectrumAnalyser);
    expect(wrapper.emitted().error).toBeTruthy();
    expect(wrapper.html()).toBeFalsy();
  });

  it('renders when there’s a valid spectrum', () => {
    const wrapper = mount(SpectrumAnalyser);
    wrapper.setData({ spectrum: new Uint8Array(null) });
    expect(wrapper.emitted().error).toBeFalsy();
    expect(wrapper.is('canvas')).toBe(true)
  });

  it('calculates points based on the frequency spectrum', () => {
    const wrapper = mount(SpectrumAnalyser);
    wrapper.setData({ spectrum: new Uint8Array([127, 0, 255, 127]) });
    const expected = [[0, 63.74901960784314], [128, 0], [256, 128], [384, 63.74901960784314]];
    expect(wrapper.emitted().error).toBeFalsy();
    expect(wrapper.vm.points).toEqual(expect.arrayContaining(expected));
  });
});
