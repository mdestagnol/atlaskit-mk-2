import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { MultiValue, scrollToValue } from '../../../components/MultiValue';
import { SizeableAvatar } from '../../../components/SizeableAvatar';
import { User } from '../../../types';
import { renderProp } from '../_testUtils';

const mockHtmlElement = (rect: Partial<DOMRect>): HTMLElement =>
  ({
    getBoundingClientRect: jest.fn(() => rect),
    scrollIntoView: jest.fn(),
  } as any);

describe('MultiValue', () => {
  const data = {
    label: 'Jace Beleren',
    data: {
      id: 'abc-123',
      name: 'Jace Beleren',
      publicName: 'jbeleren',
      avatarUrl: 'http://avatars.atlassian.com/jace.png',
    } as User,
  };
  const onClick = jest.fn();
  const shallowMultiValue = (
    { components, ...props }: any = { components: {} },
  ) => shallow(<MultiValue data={data} removeProps={{ onClick }} {...props} />);

  afterEach(() => {
    onClick.mockClear();
  });

  it('should render Tag', () => {
    const component = shallowMultiValue();
    const tag = renderProp(
      component.find(FormattedMessage as React.ComponentClass<any>),
      'children',
      'remove',
    );
    expect(tag.props()).toMatchObject({
      appearance: 'rounded',
      text: 'Jace Beleren',
      elemBefore: (
        <SizeableAvatar
          appearance="multi"
          src="http://avatars.atlassian.com/jace.png"
          name="Jace Beleren"
        />
      ),
      removeButtonText: 'remove',
    });
  });

  it('should use blueLight color when focused', () => {
    const component = shallowMultiValue({ isFocused: true });
    const tag = renderProp(
      component.find(FormattedMessage as React.ComponentClass<any>),
      'children',
      'remove',
    );
    expect(tag.props()).toMatchObject({
      appearance: 'rounded',
      text: 'Jace Beleren',
      elemBefore: (
        <SizeableAvatar
          appearance="multi"
          src="http://avatars.atlassian.com/jace.png"
          name="Jace Beleren"
        />
      ),
      removeButtonText: 'remove',
      color: 'blueLight',
    });
  });

  it('should call onClick onAfterRemoveAction', () => {
    const component = shallowMultiValue();
    const tag = renderProp(
      component.find(FormattedMessage as React.ComponentClass<any>),
      'children',
      'remove',
    );
    tag.simulate('afterRemoveAction');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not render remove button for fixed value', () => {
    const component = shallowMultiValue({
      data: { ...data, data: { ...data.data, fixed: true } },
    });
    const tag = renderProp(
      component.find(FormattedMessage as React.ComponentClass<any>),
      'children',
      'remove',
    );
    expect(tag.prop('removeButtonText')).toBeUndefined();
  });

  it('should scroll to open from bottom', () => {
    const current: HTMLElement = mockHtmlElement({ top: 10, height: 20 });
    const parent: HTMLElement = mockHtmlElement({ height: 100 });
    scrollToValue(current, parent);
    expect(current.scrollIntoView).toHaveBeenCalled();
    expect(current.scrollIntoView).toHaveBeenCalledWith();
  });

  it('should scroll to open from top', () => {
    const current: HTMLElement = mockHtmlElement({ top: 90, height: 20 });
    const parent: HTMLElement = mockHtmlElement({ height: 100 });
    scrollToValue(current, parent);
    expect(current.scrollIntoView).toHaveBeenCalled();
    expect(current.scrollIntoView).toHaveBeenCalledWith(false);
  });

  describe('shouldComponentUpdate', () => {
    const defaultProps = {
      data: data,
      isFocused: false,
      innerProps: {},
    };
    test.each([
      [false, defaultProps],
      [
        true,
        {
          ...defaultProps,
          isFocused: true,
        },
      ],
      [
        true,
        {
          ...defaultProps,
          data: {
            ...data,
            data: {
              ...data.data,
              publicName: 'crazy_jace',
            },
          },
        },
      ],
      [
        true,
        {
          ...defaultProps,
          data: {
            ...data,
            label: 'crazy_jace',
          },
        },
      ],
      [
        true,
        {
          ...defaultProps,
          innerProps: {},
        },
      ],
    ])('should return %s for nextProps %p', (shouldUpdate, nextProps) => {
      const component = shallowMultiValue(defaultProps);
      const instance = component.instance();
      expect(
        instance &&
          instance.shouldComponentUpdate &&
          instance.shouldComponentUpdate(nextProps, {}, {}),
      ).toEqual(shouldUpdate);
    });
  });
});
