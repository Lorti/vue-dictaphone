import { mount } from '@vue/test-utils';
import Dictaphone from '@/components/Dictaphone';

describe.only('Dictaphone', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Dictaphone);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('emits an error and doesn’t render when initialization fails', () => {
    const wrapper = mount(Dictaphone);
    expect(wrapper.emitted().error).toBeTruthy();
    expect(wrapper.html()).toBeFalsy();
  });

  it('starts and stops recording', async () => {
    const mediaRecorder = {
      start: jest.fn(),
      stop: jest.fn(),
    };
    const wrapper = mount(Dictaphone);
    wrapper.setData({ mediaRecorder });
    wrapper.vm.startRecording();
    expect(wrapper.vm.isRecording).toBeTruthy();
    expect(mediaRecorder.start.mock.calls.length).toBe(1);
    wrapper.vm.stopRecording();
    expect(wrapper.vm.isRecording).toBeFalsy();
    expect(mediaRecorder.stop.mock.calls.length).toBe(1);
  });

  it('returns both `blob` and `src` when done recording', async () => {
    window.URL = {
      createObjectURL: jest.fn(),
    };
    window.URL.createObjectURL.mockReturnValue('data...');
    const wrapper = mount(Dictaphone);
    wrapper.setData({ audioBlob: new Blob(new Uint8Array(null), { type: 'audio/webm' }) });
    await wrapper.vm.$nextTick();
    const firstPayload = wrapper.emitted().stop[0][0];
    expect(firstPayload).toHaveProperty('blob');
    expect(firstPayload).toHaveProperty('src', 'data...');
  });
});
