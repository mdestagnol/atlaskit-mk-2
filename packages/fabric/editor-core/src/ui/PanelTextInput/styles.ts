// StyledComponentClass and React types are imported to prevent a typescript error caused by inferred types sourced
// from external modules - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
// @ts-ignore: unused variable
// prettier-ignore
import styled, { StyledComponentClass } from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, InputHTMLAttributes } from 'react';
import { akColorN400 } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Input = styled.input`
  // Normal .className gets overridden by input[type=text] hence this hack to produce input.className
  input& {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-sizing: content-box;
    color: ${akColorN400};
    flex-grow: 1;
    font-size: 13px;
    line-height: 20px;
    padding: 0;
    ${props => (props.width ? `width: ${props.width}px` : '')} height: 20px;
    min-width: 145px;

    /* Hides IE10+ built-in [x] clear input button */
    &::-ms-clear {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${akColorN400};
      opacity: 0.5;
    }
  }
`;
