import React from 'react';
import renderer from 'react-test-renderer';
import DetailPage from './index';

const props = {
  location: {
    pathname: '/detail',
    search: '',
    hash: '',
    key: '',
    state: {
      clicked: true,
      clickedItem: {
        title: 'this is a clicked item',
        overview: 'this is an overview of the clicked item',
        release_date: '2020-03-05',
      },
      posterToShow:
        'http://image.tmdb.org/t/p/w185/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
    },
  },
};

describe('DetailPage Component', () => {
  let component;

  beforeEach(() => {
    component = renderer.create(
      <DetailPage
        location={props.location}
        clickedItem={props.location.state.clickedItem}
      />,
    );
  });

  it('should render correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
