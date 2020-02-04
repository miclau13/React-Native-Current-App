
import React from 'react';
import { create } from 'react-test-renderer';
import { TextInput } from 'react-native-paper';

import HomeView from '../HomeView';

describe('Home View', () => {
  describe('onFocusHandler', () => {
    it('should call onFocus', () => {
        // Arrange
        const mockOnFocus = jest.fn();      // 1. mock function
        const component = create(<HomeView handleOnFocus={mockOnFocus} />);
        const textInputInstance = component.root.findByType(TextInput); // 3. getting an instance of component
        
        // Act
        textInputInstance.props.onFocus();        // 4. manually triggering onPressHandler()

        // Assert
        expect(mockOnFocus).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledTimes(1);   // 5. checking return values
    });
  });
});