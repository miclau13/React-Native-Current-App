import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ButtonProps, CardProps, Icon, Image } from 'react-native-elements';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useQuery } from '@apollo/react-hooks';

import { getDefaultCategoryList } from './utils';
import HomeView from './HomeView';
import { LoadingComponent } from '../InitialLoading';

type Params = {};
type ScreenProps = {};

export type CategoryList = {
  buttonProps: ButtonProps;
  description: string;
  image: CardProps['image'];
  imageProps: CardProps['imageProps'];
  imageStyle: CardProps['imageStyle'];
  title: CardProps['title'];
}[];

export interface HomeViewProps {
  categoryList: CategoryList;
};


const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const [loading] = React.useState(false);
  const categoryList = getDefaultCategoryList();
  if (loading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <HomeView categoryList={categoryList} />
  )
};

export default React.memo(Home);