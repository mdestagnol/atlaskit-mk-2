// @flow

import React from 'react';
import { mount } from 'enzyme';

import Textfield from '../../Textfield';

describe('Textfield', () => {
  test('should show defaults', () => {
    const wrapper = mount(<Textfield />);
    expect(wrapper).toHaveLength(1);
  });

  describe('- Properties', () => {
    describe('isCompact', () => {
      test("should set it's value to true on the input", () => {
        const wrapper = mount(<Textfield isCompact />).props().isCompact;
        expect(wrapper).toBe(true);
      });
    });

    describe('isDisabled', () => {
      test("should set it's value to true on the input", () => {
        const wrapper = mount(<Textfield isDisabled />).props().isDisabled;
        expect(wrapper).toBe(true);
      });
    });

    describe('isFocused', () => {
      test("should set it's value to true on the input", () => {
        const wrapper = mount(<Textfield isFocused />).props().isFocused;
        expect(wrapper).toBe(true);
      });
    });

    describe('isReadOnly', () => {
      test("should set it's value to true on the input", () => {
        const wrapper = mount(<Textfield isReadOnly />).props().isReadOnly;
        expect(wrapper).toBe(true);
      });
    });

    describe('isRequired', () => {
      test("should set it's value to true on the input", () => {
        const wrapper = mount(<Textfield isRequired />).props().isRequired;
        expect(wrapper).toBe(true);
      });
    });

    describe('isMonospaced', () => {
      test("should set it's value to true on the input", () => {
        const wrapper = mount(<Textfield isMonospaced />).props().isMonospaced;
        expect(wrapper).toBe(true);
      });
    });

    describe('width', () => {
      test("should set it's value to `small` on the input", () => {
        const wrapper = mount(<Textfield width="small" />).props().width;
        expect(wrapper).toBe('small');
      });
    });

    describe('native input props', () => {
      test('should pass through any native input props to the input', () => {
        const nativeProps = {
          type: 'text',
          disabled: true,
          name: 'test',
          placeholder: 'test placeholder',
          maxLength: 8,
          min: 1,
          max: 8,
          required: true,
          autoComplete: 'on',
          form: 'test-form',
          pattern: '/.+/',
        };

        const wrapper = mount(<Textfield {...nativeProps} />)
          .find('input')
          .props();
        expect(wrapper).toEqual(expect.objectContaining(nativeProps));
      });
    });

    describe('native input events', () => {
      // TODO - fix events
      const nativeEvents = [
        'onChange',
        /*'onBlur', 'onFocus',*/
        'onKeyDown',
        'onKeyPress',
        'onKeyUp',
      ];
      nativeEvents.forEach(event => {
        test(event, () => {
          const eventSpy = jest.fn();
          const wrapper = mount(<Textfield {...{ [event]: eventSpy }} />);
          const input = wrapper.find('input');
          expect(input.prop(event)).toBe(eventSpy);

          const simulateEvent = event.replace(/^on/, '').toLowerCase();
          input.simulate(simulateEvent);

          expect(eventSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('onFocus', () => {
      test('should get focus when onFocus() is called', () => {
        const focusSpy = jest.fn();
        const wrapper = mount(<Textfield onFocus={focusSpy} />);
        expect(focusSpy).toHaveBeenCalledTimes(0);
        wrapper.find('input').prop('onFocus')();
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('defaultValue', () => {
      test('should have defaultValue="test default value"', () => {
        const wrapper = mount(
          <Textfield defaultValue="test default value" />,
        ).prop('defaultValue');
        expect(wrapper).toBe('test default value');
      });
    });

    describe('value', () => {
      test('should have value="test value"', () => {
        const wrapper = mount(<Textfield value="test value" />).prop('value');
        expect(wrapper).toBe('test value');
      });
    });

    describe('onChange', () => {
      test('should update input value when called', () => {
        const spy = jest.fn();
        const wrapper = mount(<Textfield value="" onChange={spy} />);
        wrapper.find('input').simulate('change');
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
