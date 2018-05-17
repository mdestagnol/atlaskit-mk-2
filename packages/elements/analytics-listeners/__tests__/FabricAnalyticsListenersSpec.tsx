import * as React from 'react';
import { mount } from 'enzyme';
import FabricAnalyticsListeners from '../src/FabricAnalyticsListeners';
import {
  DummyComponentWithAnalytics,
  DummyComponent,
} from '../example-helpers';

describe('<FabricAnalyticsListeners />', () => {
  let analyticsWebClientMock;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
  });

  describe('<FabricElementsListener />', () => {
    it('should listen and fire an UI event with analyticsWebClient', () => {
      const compOnClick = jest.fn();
      const component = mount(
        <FabricAnalyticsListeners client={analyticsWebClientMock}>
          <DummyComponentWithAnalytics onClick={compOnClick} />
        </FabricAnalyticsListeners>,
      );

      const analyticsListener = component.find('FabricElementsListener');
      expect(analyticsListener.props()).toHaveProperty(
        'client',
        analyticsWebClientMock,
      );

      const dummyComponent = analyticsListener.find(DummyComponent);
      expect(dummyComponent.length).toBe(1);

      dummyComponent.simulate('click');
      expect(compOnClick).toBeCalled();
    });
  });
});
