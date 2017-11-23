import { mount } from 'enzyme';
import * as React from 'react';
import imageUploadPlugins, { ImageUploadState } from '../../src/plugins/image-upload';
import ToolbarImage from '../../src/ui/ToolbarImage';
import AkButton from '@atlaskit/button';
import { doc, code_block, p, makeEditor, defaultSchema } from '@atlaskit/editor-test-helpers';
import { analyticsService } from '../../src/analytics';

describe('ToolbarImage', () => {
  const editor = (doc: any) => makeEditor<ImageUploadState>({
    doc,
    plugins: imageUploadPlugins(defaultSchema),
  });

  describe('when plugin is enabled', () => {
    it('sets disabled to false', () => {
      const { editorView, pluginState } = editor(doc(p('text')));
      const toolbarImage = mount(<ToolbarImage pluginState={pluginState} editorView={editorView} />);

      expect(toolbarImage.state('disabled')).toBe(false);
      toolbarImage.unmount();
    });
  });

  describe('when plugin is not enabled', () => {
    it('sets disabled to true', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));
      const toolbarImage = mount(<ToolbarImage pluginState={pluginState} editorView={editorView} />);

      expect(toolbarImage.state('disabled')).toBe(true);
      toolbarImage.unmount();
    });
  });

  describe('analytics', () => {
    it('should trigger analyticsService.trackEvent', () => {
      const { editorView, pluginState } = editor(doc(p('text')));
      const spy = jest.spyOn(pluginState, 'handleImageUpload');
      spy.mockImplementation(() => true);
      const trackEvent = jest.fn();
      analyticsService.trackEvent = trackEvent;
      const toolbarOption = mount(<ToolbarImage pluginState={pluginState} editorView={editorView} />);
      toolbarOption.find(AkButton).simulate('click');
      expect(trackEvent).toHaveBeenCalledWith('atlassian.editor.image.button');
      toolbarOption.unmount();
      spy.mockRestore();
    });
  });
});
