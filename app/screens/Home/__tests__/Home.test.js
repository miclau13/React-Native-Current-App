
import { mount, shallow } from 'enzyme';
import React from 'react';
import { MockedProvider } from "@apollo/react-testing";
import { create } from 'react-test-renderer';

import Home, { VIEWER_QUERY } from '../Home';

const mocks = [
  {
    request: {
      query: VIEWER_QUERY,
    },
    result: {
      viewer: { 
        id: 1, 
        givenName: 'Michael',
        familyName: 'Lau',
        picture: 'Test',
        email: 'michaellau@innode.com',
        phoneNumber: '96826601',
        address: 'Hong Kong',
      },
    },
  },
];

describe('Home component', () => {
  it("Matches the snapshot", () => {
    const navigation = { navigate: jest.fn() };
    const home = create(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Home navigation={navigation} />
      </MockedProvider>
    );
    expect(home.toJSON()).toMatchSnapshot();
  });
});