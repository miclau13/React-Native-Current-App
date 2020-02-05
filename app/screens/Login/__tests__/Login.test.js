
import React from 'react';
import { create } from 'react-test-renderer';
import wait from 'waait';

import Login from '../Login';

const navigation = { getParam: jest.fn(), navigate: jest.fn() };

describe('Login component', () => {
  it("should render loading state initially", () => {
    const component = create(
      <Login navigation={navigation} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render Login View", async () => {
    const component = create(
      <Login navigation={navigation} />
    );

    await wait(0); 

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});