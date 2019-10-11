import React from 'react';
import { Avatar, Button, ButtonProps, Card, CardProps } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import BathroomRemodelPic from '../../../assets/bathroom_remodel.jpeg';

export interface BathroomRemodelCardProps extends CardProps {
  onButtonPress: ButtonProps['onPress'];
};

const BathroomRemodelCard: React.ComponentType<BathroomRemodelCardProps> = (props) => {
  const { onButtonPress } = props;
  return (
    <Card>
      <Card.Title 
        title="Bathroom Remodel" 
        left={(props) => <Avatar.Icon {...props} icon={props => <AwesomeIcon name="bath" {...props} />} />} 
      />
      <Card.Cover source={BathroomRemodelPic} />
      <Card.Actions>
        <Button 
          icon={props => <AwesomeIcon name="tools" {...props} />} 
          mode="contained" 
          onPress={onButtonPress}
          style={styles.button}
        >
        </Button>
      </Card.Actions>
    </Card>
  )
};

export default React.memo(BathroomRemodelCard);