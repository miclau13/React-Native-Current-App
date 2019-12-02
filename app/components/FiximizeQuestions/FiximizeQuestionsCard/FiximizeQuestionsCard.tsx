import React from 'react';
import { Avatar, Card, CardProps } from 'react-native-paper';

import FiximizeQuestionsPic from '../../../../assets/kitchen_remodel.jpeg';

export interface FiximizeQuestionsCardProps extends Omit<CardProps, "children"> {
};

const FiximizeQuestionsCard: React.ComponentType<FiximizeQuestionsCardProps> = (props) => {
  return (
    <Card {...props}>
      <Card.Title 
        title="Fiximize Questions" 
        left={(props) => <Avatar.Icon {...props} icon="kitchen" />} 
      />
      <Card.Cover source={FiximizeQuestionsPic} />
    </Card>
  )
};

export default React.memo(FiximizeQuestionsCard);