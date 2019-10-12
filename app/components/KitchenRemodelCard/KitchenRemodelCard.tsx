import React from 'react';
import { Avatar, Card, CardProps } from 'react-native-paper';

import KitchenRemodelPic from '../../../assets/kitchen_remodel.jpeg';

export interface BathroomRemodelCardProps extends Omit<CardProps, "children"> {
};

const BathroomRemodelCard: React.ComponentType<BathroomRemodelCardProps> = (props) => {
  return (
    <Card {...props}>
      <Card.Title 
        title="Kitchen Remodel" 
        left={(props) => <Avatar.Icon {...props} icon="kitchen" />} 
      />
      <Card.Cover source={KitchenRemodelPic} />
    </Card>
  )
};

export default React.memo(BathroomRemodelCard);