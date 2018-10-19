import memoizeOne from 'memoize-one';
import { UserMultiValueLabel } from './UserMultiValueLabel';
import { UserMultiValueRemove } from './UserMultiValueRemove';

export const getComponents = memoizeOne((anchor?: React.ComponentType<any>) => {
  if (anchor) {
    return {
      MultiValueLabel: UserMultiValueLabel,
      MultiValueRemove: UserMultiValueRemove,
      Control: anchor,
    };
  } else {
    return {
      MultiValueLabel: UserMultiValueLabel,
      MultiValueRemove: UserMultiValueRemove,
    };
  }
});
