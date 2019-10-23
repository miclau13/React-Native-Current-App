import React from 'react';
import { Avatar, Card, CardProps } from 'react-native-paper';

import KitchenRemodelPic from '../../../assets/kitchen_remodel.jpeg';

export interface KitchenRemodelCardProps extends Omit<CardProps, "children"> {
};

const KitchenRemodelCard: React.ComponentType<KitchenRemodelCardProps> = (props) => {
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

export default React.memo(KitchenRemodelCard);