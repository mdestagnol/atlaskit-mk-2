import * as React from 'react';
import { AvatarGroup } from '@atlaskit/avatar';
import { UserViewModel } from '../../../shared/ViewModel';
import { Wrapper } from './styled';

export interface UsersProps {
  users?: UserViewModel[];
}

export default class Users extends React.Component<UsersProps> {
  /* prevent the parent link handler from opening a URL when clicked */
  handleAvatarClick = ({ event }: { event: MouseEvent }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /* prevent the parent link handler from opening a URL when clicked */
  handleMoreClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { users = [] } = this.props;

    if (users.length === 0) {
      return null;
    }

    return (
      <Wrapper>
        <AvatarGroup
          appearance="stack"
          size="small"
          data={users.map(user => ({
            name: user.name,
            src: user.icon,
            size: 'small',
          }))}
          onAvatarClick={this.handleAvatarClick}
          onMoreClick={this.handleMoreClick}
        />
      </Wrapper>
    );
  }
}
