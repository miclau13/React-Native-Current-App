import React from 'react';
import { Button } from 'react-native';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  const deleteMode = navigation.getParam("deleteMode", false);
  const lengthOfSelectedRehabRecords = navigation.getParam("lengthOfSelectedRehabRecords", 0);
  const loading = navigation.getParam("loading", true);
  const myRehabRequests = navigation.getParam("myRehabRequests");
  const handleHeaderRightOnPress = () => {
    navigation.setParams({ deleteMode: !deleteMode });
  };
  const handleHeaderLeftOnPress = () => {
    navigation.setParams({ openConfirmModal: true });
  };
  const _headerTitle = deleteMode ?
    lengthOfSelectedRehabRecords ? 
      `${lengthOfSelectedRehabRecords} Record(s) Selected` : 
      "Select Records"
    : null;
  return { 
    headerLeft: (props) => {
      if (!deleteMode || loading) {
        return null;
      };
      return (
        <Button
          { ...props }
          color={primaryButtonColor}
          onPress={handleHeaderLeftOnPress}
          title="Delete"
        />
      )
    },
    headerRight: (props) => {
      if (loading) {
        return null;
      };
      return (
        <Button
          { ...props }
          color={primaryButtonColor}
          disabled={myRehabRequests.length < 1}
          onPress={handleHeaderRightOnPress}
          title={!deleteMode ? "Select" : "Cancel"}
        />
      )
    },
    headerTitle: _headerTitle,
  }
};

export default navigationOptions;