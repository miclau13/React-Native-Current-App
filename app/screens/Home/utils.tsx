
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';

import { CategoryList } from './Home';

const MaskCoverImage: CategoryList[0]['image'] = require('./assets/mask_cover.png');
const SanitizerCoverImage: CategoryList[0]['image'] = require('./assets/sanitizer_cover.jpeg');
const PaperRollCoverImage: CategoryList[0]['image'] = require('./assets/paper_roll_cover.jpeg');
const RiceCoverImage: CategoryList[0]['image'] = require('./assets/rice_cover.jpeg');



const categoryList: CategoryList = [
  { 
    buttonProps: { 
      icon: <Icon color='white' name='cursor-default-click' type='material-community' />,
      iconRight: true,
      titleStyle: { marginRight: 8 },
      title: 'Find Out More', 
    },
    description: '(Description 1)',
    image: MaskCoverImage,
    imageProps: {
      resizeMode: 'contain',
      PlaceholderContent: <ActivityIndicator />
    },
    imageStyle: {
      height: 100,
      width: 100, 
    },
    title: "Category 1", 
  },
  { 
    buttonProps: { 
      icon: <Icon color='white' name='cursor-default-click' type='material-community' />,
      iconRight: true,
      titleStyle: { marginRight: 8 },
      title: 'Find Out More', 
    },
    description: '(Description 2)',
    image: SanitizerCoverImage,
    imageProps: {
      resizeMode: 'contain',
      PlaceholderContent: <ActivityIndicator />
    },
    imageStyle: {
      height: 100,
      width: 100, 
    },
    title: "Category 2", 
  },
  { 
    buttonProps: { 
      icon: <Icon color='white' name='cursor-default-click' type='material-community' />,
      iconRight: true,
      titleStyle: { marginRight: 8 },
      title: 'Find Out More', 
    },
    description: '(Description 3)',
    image: PaperRollCoverImage,
    imageProps: {
      resizeMode: 'contain',
      PlaceholderContent: <ActivityIndicator />
    },
    imageStyle: {
      height: 100,
      width: 100, 
    },
    title: "Category 3", 
  },
  { 
    buttonProps: { 
      icon: <Icon color='white' name='cursor-default-click' type='material-community' />,
      iconRight: true,
      titleStyle: { marginRight: 8 },
      title: 'Find Out More', 
    },
    description: '(Description 4)',
    image: RiceCoverImage,
    imageProps: {
      resizeMode: 'contain',
      PlaceholderContent: <ActivityIndicator />
    },
    imageStyle: {
      height: 100,
      width: 100, 
    },
    title: "Category 4", 
  },
];

export const getDefaultCategoryList = () => {
  return categoryList;
}