
import React from 'react';
import { Text } from 'react-native';
import { create } from 'react-test-renderer';
import wait from 'waait';

import { MockedProvider } from "@apollo/react-testing";

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
  it("should render loading state initially", () => {
    const navigation = { navigate: jest.fn() };
    const component = create(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Home navigation={navigation} />
      </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render Home View", async () => {
    const navigation = { navigate: jest.fn() };
    const component = create(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Home navigation={navigation} />
      </MockedProvider>
    );

    await wait(0); 

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});