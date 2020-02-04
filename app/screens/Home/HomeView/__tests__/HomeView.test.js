
import { shallow } from 'enzyme';
import React from 'react';
// import { create } from 'react-test-renderer';

import HomeView from '../HomeView';

// const createTestProps = (props) => ({
//   navigation: {
//     navigate: jest.fn()
//   },
//   ...props
// });

// describe("LoadingScreen", () => {
//   describe("rendering", () => {
//     let wrapper: ShallowWrapper;
//     let props: any;   // use type "any" to opt-out of type-checking
//     beforeEach(() => {
//       props = createTestProps({});
//       wrapper = shallow(<LoadingScreen {...props} />);   // no compile-time error
//     });

//     it("should render a <View />", () => {
//       expect(wrapper.find(View)).toHaveLength(1);   // SUCCESS
//       expect(props.navigation.navigate).toHaveBeenCalledWith('LoginScreen');   // SUCCESS
//     });
//   });
// });

// describe('Home component', () => {
//   const handleOnFocus = { handleOnFocus: jest.fn() };
//   const homeView = create(<HomeView handleOnFocus={handleOnFocus} />);

//   it('fires onFocus handler when user clicks on it', () => {
//     // let component;
//     // act(() => {
//     //   component = create(<Button text="SUBSCRIBE TO BASIC" />);
//     // });
//     // console.log("homeView",homeView)
 
//     // const instance = homeView.root;
//     // console.log("instance",instance)
//     // const textInput = instance.findByType("TextInput");
//     // const handleOnFocus = textInput.props.onFocus;
//     // console.log("textInput:",textInput)
//     // console.log("textInput.props:",textInput.props)
//     // const wrapper = shallow(<HomeView handleOnFocus={handleOnFocus} />);
//     // console.log("wrapper:", wrapper)
//     // wrapper.find('TextInput').simulate('onFocus');
//     // expect(handleOnFocus).to.have.property('callCount', 1);
//   });
// });

describe('Home View', () => {
  describe('onFocusHandler', () => {
      it('should call onFocus', () => {
          // Arrange
          const mockOnFocus = jest.fn();      // 1. mock function
          const component = shallow(<HomeView handleOnFocus={mockOnFocus} />);
          console.debug("component", component)
          // const instance = component.instance();  // 3. getting an instance of component

          // // Act
          // instance.handleOnFocus();          // 4. manually triggering onPressHandler()

          // // Assert
          // expect(mockOnFocus).toHaveBeenCalled();
          // expect(mockOnFocus).toHaveBeenCalledTimes(1);   // 5. checking return values
      });
  });
});