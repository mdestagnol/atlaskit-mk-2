import React, { Component } from 'react';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
} from '../../src/primitives';
import MockProvider from './mock-provider';

class AppSwitcher extends Component {
  render() {
    return (
      <MockProvider>
        {({ isLoading, data }) =>
          isLoading ? (
            'Loading...'
          ) : (
            <AppSwitcherWrapper>
              <Section isAdmin title="First Section">
                <AppSwitcherItem icon={SettingsIcon}>
                  {`${data.data} First Item`}
                </AppSwitcherItem>
                <AppSwitcherItem>{`${data.data} Second Item`}</AppSwitcherItem>
                <AppSwitcherItem>{`${data.data} Third Item`}</AppSwitcherItem>
              </Section>
              <Section title="Second Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <Section title="Third Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <ManageButton onClick={() => {}} />
            </AppSwitcherWrapper>
          )
        }
      </MockProvider>
    );
  }
}

export default AppSwitcher;
