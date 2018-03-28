import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import searchResults, { Props } from '../src/components/SearchResults';
import {
  AkNavigationItemGroup,
  quickSearchResultTypes,
} from '@atlaskit/navigation';
import { ResultType, Result } from '../src/model/Result';
import ObjectResult from '../src/components/ObjectResult';
import SearchError from '../src/components/SearchError';
import EmptyState from '../src/components/EmptyState';

const { PersonResult, ResultBase } = quickSearchResultTypes;

enum Group {
  Recent = 'recent',
  Jira = 'jira',
  Confluence = 'confluence',
  People = 'people',
}

function findGroup(group: Group, wrapper: ShallowWrapper) {
  return wrapper
    .find(AkNavigationItemGroup)
    .findWhere(n => n.prop('test-selector') === group.valueOf());
}

function makeResult(partial?: Partial<Result>): Result {
  return {
    resultId: '' + Math.random,
    name: 'name',
    type: ResultType.Object,
    avatarUrl: 'avatarUrl',
    href: 'href',
    ...partial,
  };
}

describe('SearchResults', () => {
  function render(partialProps: Partial<Props>) {
    const props = {
      query: '',
      isError: false,
      retrySearch: () => {},
      recentlyViewedItems: [],
      recentResults: [],
      jiraResults: [],
      confluenceResults: [],
      peopleResults: [],
      ...partialProps,
    };

    return shallow(<div>{searchResults(props)}</div>);
  }

  it('should render recently viewed items when no query is entered', () => {
    const props = {
      query: '',
      recentlyViewedItems: [makeResult()],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Recent, wrapper);

    expect(group.prop('title')).toEqual('Recently viewed');
    expect(group.find(ObjectResult).prop('name')).toEqual('name');
  });

  it('should only show the recently viewed group when no query is entered', () => {
    const props = {
      query: '',
      recentlyViewedItems: [makeResult()],
    };

    const wrapper = render(props);

    const groups = wrapper.find(AkNavigationItemGroup);
    expect(groups).toHaveLength(1);
  });

  it('should render recent results when there are results', () => {
    const props = {
      query: 'na',
      recentResults: [makeResult({ name: 'name' })],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Recent, wrapper);

    expect(group.prop('title')).toEqual('Recently viewed');
    expect(group.find(ObjectResult).prop('name')).toEqual('name');
  });

  it('should render jira results when there are results', () => {
    const props = {
      query: 'na',
      jiraResults: [makeResult({ name: 'name' })],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Jira, wrapper);

    expect(group.prop('title')).toEqual('Jira issues');
    expect(group.find(ObjectResult).prop('name')).toEqual('name');
  });

  it('should render confluence results when there are results', () => {
    const props = {
      query: 'na',
      confluenceResults: [makeResult({ name: 'name' })],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Confluence, wrapper);

    expect(group.prop('title')).toEqual('Confluence pages and blogs');
    expect(group.find(ObjectResult).prop('name')).toEqual('name');
  });

  it('should render people results when there are results', () => {
    const props = {
      query: 'na',
      peopleResults: [makeResult({ type: ResultType.Person, name: 'name' })],
    };

    const wrapper = render(props);
    const group = findGroup(Group.People, wrapper);

    expect(group.prop('title')).toEqual('People');
    expect(group.find(PersonResult).prop('name')).toEqual('name');
  });

  it('should render a jira result item to search jira', () => {
    const props = {
      query: 'na',
      jiraResults: [makeResult()],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Jira, wrapper);

    expect(group.prop('title')).toEqual('Jira issues');
    expect(group.find(ResultBase).prop('resultId')).toEqual('search_jira');
  });

  it('should render a confluence result item to search confluence', () => {
    const props = {
      query: 'na',
      confluenceResults: [makeResult()],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Confluence, wrapper);

    expect(group.prop('title')).toEqual('Confluence pages and blogs');
    expect(group.find(ResultBase).prop('resultId')).toEqual(
      'search_confluence',
    );
  });

  it('should render a people result item to search people', () => {
    const props = {
      query: 'na',
      peopleResults: [makeResult({ type: ResultType.Person })],
    };

    const wrapper = render(props);
    const group = findGroup(Group.People, wrapper);

    expect(group.prop('title')).toEqual('People');
    expect(group.find(ResultBase).prop('resultId')).toEqual('search_people');
  });

  it('should not render recent results group when there are no recent results', () => {
    const props = {
      query: 'aslfkj',
      recentResults: [],
    };

    const wrapper = render(props);
    const group = findGroup(Group.Recent, wrapper);
    expect(group.exists()).toBe(false);
  });

  it('should render search error when there is an error', () => {
    const props = {
      isError: true,
    };

    const wrapper = render(props);
    expect(wrapper.find(SearchError).exists()).toBe(true);
  });

  it('should render empty state when there are no results and a query is entered', () => {
    const props = {
      query: 'foo',
      recentResults: [],
      jiraResults: [],
      confluenceResults: [],
      peopleResults: [],
    };

    const wrapper = render(props);
    expect(wrapper.find(EmptyState).exists()).toBe(true);

    // assert advanced search links are there
    ['search_jira', 'search_confluence', 'search_people'].forEach(resultId => {
      expect(
        wrapper
          .find(ResultBase)
          .findWhere(wrapper => wrapper.prop('resultId') === resultId)
          .exists(),
      ).toBe(true);
    });
  });
});
