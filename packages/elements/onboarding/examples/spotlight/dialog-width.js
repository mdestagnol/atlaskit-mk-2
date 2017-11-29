import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import styled from 'styled-components';
import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up';
import ArrowDownIcon from '@atlaskit/icon/glyph/arrow-down';

import { Spotlight, SpotlightTarget } from '../../../src';
import { Code, Highlight } from '../../styled';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const Button = styled.button`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.2em;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  height: 32px;
  margin-right: 4px;
  justify-content: center;
  width: 36px;
  opacity: 0.75;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    opacity: 1;
    outline: 0;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    opacity: 0.5;
  }
`;

/* eslint-disable react/sort-comp */
export default class SpotlightDialogWidthExample extends Component {
  state = {};
  start = () => this.setState({ value: 300 });
  increment = () =>
    this.setState(({ value }) => ({ value: Math.min(value + 100, 600) }));
  decrement = () =>
    this.setState(({ value }) => ({ value: Math.max(value - 100, 160) }));
  finish = () => this.setState({ value: undefined });
  render() {
    const { value } = this.state;
    const deltaButtons = (
      <ButtonGroup appearance="help">
        <Button onClick={this.decrement}>
          <ArrowDownIcon label="Decrement" />
        </Button>
        <Button onClick={this.increment}>
          <ArrowUpIcon label="Increment" />
        </Button>
      </ButtonGroup>
    );

    return (
      <Wrapper>
        <SpotlightTarget name="unique">
          <Highlight color="neutral">Target</Highlight>
        </SpotlightTarget>

        <p>
          Spotlight&apos;s supported dialog widths are between{' '}
          <Code>160px</Code> and <Code>600px</Code>.
        </p>
        <p>
          +/- buttons passed to the <Code>actionsBeforeElement</Code> property.
        </p>
        <p>
          <button onClick={this.start}>Show</button>
        </p>

        {value && (
          <Spotlight
            actions={[{ onClick: this.finish, text: 'Done' }]}
            actionsBeforeElement={deltaButtons}
            dialogPlacement="top center"
            dialogWidth={value}
            heading={`${value}px`}
            key="unique"
            target="unique"
          >
            <Lorem count={1} />
          </Spotlight>
        )}
      </Wrapper>
    );
  }
}
