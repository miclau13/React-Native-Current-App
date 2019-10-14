import React from 'react';
import { Avatar, Card, CardProps } from 'react-native-paper';

import FloorRemodelPic from '../../../assets/floor_remodel.jpeg';

export interface FloorRemodelCardProps extends Omit<CardProps, "children"> {
};

const FloorRemodelCard: React.ComponentType<FloorRemodelCardProps> = (props) => {
  return (
    <Card {...props}>
      <Card.Title 
        title="Floor Remodel" 
        left={(props) => <Avatar.Icon {...props} icon="grid-on" />} 
      />
      <Card.Cover source={FloorRemodelPic} />
    </Card>
  )
};

export default React.memo(FloorRemodelCard);