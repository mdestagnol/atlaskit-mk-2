import { AVATAR_SIZES, BORDER_WIDTH } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import styled from 'styled-components';
import memoizeOne from 'memoize-one';
import { getAvatarSize } from './utils';

export const PLACEHOLDER_PADDING = 8;

export const getStyles = memoizeOne(width => ({
  menu: (css, state) => ({
    ...css,
    width,
    minWidth: state.selectProps.menuMinWidth,
  }),
  control: (css, state) => ({
    ...css,
    width,
    borderColor: state.isFocused
      ? css.borderColor
      : state.selectProps.subtle
      ? 'transparent'
      : colors.N40,
    backgroundColor: state.isFocused
      ? css['backgroundColor']
      : state.selectProps.subtle
      ? 'transparent'
      : colors.N10,
    '&:hover .fabric-user-picker__clear-indicator': { opacity: 1 },
    ':hover': {
      ...css[':hover'],
      borderColor: state.isFocused
        ? css[':hover'].borderColor
        : state.selectProps.subtle
        ? state.selectProps.hoveringClearIndicator
          ? colors.R50
          : colors.N30
        : colors.N40,
      backgroundColor:
        state.selectProps.subtle && state.selectProps.hoveringClearIndicator
          ? colors.R50
          : state.isFocused
          ? css[':hover'].backgroundColor
          : colors.N30,
    },
    padding: 0,
    minHeight: state.selectProps.appearance === 'compact' ? 32 : 44,
    alignItems: 'stretch',
    maxWidth: '100%',
  }),
  clearIndicator: ({
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...css
  }) => ({
    ...css,
    opacity: 0,
    transition: css.transition + ', opacity 150ms',
    paddingTop: 0,
    padding: 0,
    ':hover': {
      color: colors.R400,
    },
  }),
  valueContainer: ({ paddingTop, paddingBottom, position, ...css }, state) => ({
    ...css,
    flexGrow: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    maxHeight: 100,
    overflow: 'hidden',
    flexWrap: state.selectProps.isMulti ? 'wrap' : 'nowrap',
  }),
  multiValue: css => ({
    ...css,
    borderRadius: 24,
  }),
  multiValueRemove: css => ({
    ...css,
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'transparent' },
  }),
  placeholder: (css, state) => {
    const avatarSize = getAvatarSize(state.selectProps.appearance);
    return {
      ...css,
      paddingLeft: !state.selectProps.isMulti
        ? 2 * PLACEHOLDER_PADDING +
          2 * BORDER_WIDTH[avatarSize] +
          AVATAR_SIZES[avatarSize]
        : PLACEHOLDER_PADDING,
      paddingRight: 2,
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingTop: 2,
      maxWidth: '100%',
      margin: 0,
    };
  },
  option: css => ({
    ...css,
    overflow: 'hidden',
  }),
  input: ({ margin, ...css }) => ({
    ...css,
    display: 'flex',
    alignSelf: 'center',
    paddingBottom: 1,
    paddingLeft: PLACEHOLDER_PADDING,
    '& input::placeholder': {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: colors.N100,
      opacity: 1 /* Firefox */,
    },
    '& input:-ms-input-placeholder': {
      /* Internet Explorer 10-11 */
      color: colors.N100,
    },
  }),
}));

export const OptionTextWrapper = styled.span`
  color: ${({ color }) => color};
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`;
