
import React from 'react';
import { create } from 'react-test-renderer';

import Home from '../Home';

describe('Home component', () => {
  test("Matches the snapshot", () => {
    const navigation = { navigate: jest.fn() };
    const home = create(<Home navigation={navigation}/>);
  
    expect(home.toJSON()).toMatchSnapshot();
  });
});