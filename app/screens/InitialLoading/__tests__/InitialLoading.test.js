
import React from 'react';
import { create } from 'react-test-renderer';

import InitialLoading from '../InitialLoading';

describe('InitialLoading component', () => {
  it("should render loading state initially", () => {
    const navigation = { navigate: jest.fn() };
    const component = create(
        <InitialLoading navigation={navigation} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});