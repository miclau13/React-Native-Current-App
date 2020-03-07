import React from 'react';

import styles from './styles';
import { CreateRehabViewProps } from '../CreateRehab';
import { LoadingComponent } from '../../InitialLoading';

const CreateRehabView: React.ComponentType<CreateRehabViewProps> = (props) => {

  return (
    <LoadingComponent />
  );
}
export default React.memo(CreateRehabView);