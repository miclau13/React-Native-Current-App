import { gql } from 'apollo-boost';
import React from 'react';
import { IconProps, ListItemProps } from 'react-native-elements';
import { ModalProps } from 'react-native-modal';
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery, useMutation } from '@apollo/react-hooks';

import RehabRecordsView from './RehabRecordsView';
import RehabRecordsDeleteView from './RehabRecordsDeleteView';
import { LoadingComponent } from '../InitialLoading';
import { DeleteRehab, DeleteRehabVariables } from '../../generated/DeleteRehab';
import { MyRehabRequests, MyRehabRequests_myRehabRequests } from '../../generated/MyRehabRequests';

const MY_REHAB_REQUESTS = gql`
  query MyRehabRequests {
    myRehabRequests {
      id
      address
      arv
      asIs
      propertyDetails
      vacant
      totalDebts
      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
        }
        submitted
      }
    }
  }
`;

const DELETE_REHAB = gql`
  mutation DeleteRehab($input: DeleteRehabInput!) {
    deleteRehab(input: $input)
  }
`;

type Params = {
  deleteMode: boolean;
  lengthOfSelectedRehabRecords: number;
  loading: boolean;
  openConfirmModal: boolean;
};

type ScreenProps = {};

interface RehabRecords extends MyRehabRequests_myRehabRequests {
  checked: boolean;
};

export type RehabRecordsDeleteProps = {
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleCancelOnPress: ButtonProps['onPress'];
  handleDeleteOnPress: ButtonProps['onPress'];
  lengthOfSelectedRehabRecords: number;
  openConfirmModal: boolean;
}

export type RehabRecordsProps = {
  deleteMode: boolean;
  rehabRecords: RehabRecords[];
  handleItemOnPress(index: number): ListItemProps['onPress'];
  handleItemDeleteOnPress(index: number): IconProps['onPress'];
};

const RehabRecords: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const deleteMode = navigation.getParam("deleteMode", false);
  const lengthOfSelectedRehabRecords = navigation.getParam("lengthOfSelectedRehabRecords", 0);
  const openConfirmModal = navigation.getParam("openConfirmModal", false);
  const { data, loading, refetch: myRehabRequestsRefetch } = useQuery<MyRehabRequests>(MY_REHAB_REQUESTS);
  const [deleteRehab, { loading: deleteRehabLoading }] = useMutation<DeleteRehab, DeleteRehabVariables>(DELETE_REHAB);
  
  const myRehabRequests = data?.myRehabRequests || [];
  const [rehabRecords, setRehabRecords] = React.useState<RehabRecords[]>([]);
  const selectedRehabRecordsIds = rehabRecords.filter(record => record.checked).map(record => record.id);

  const deleteRehabs = async () => {
    const deleteRehabMutations = selectedRehabRecordsIds.map(id => {
      const result = deleteRehab({ variables: { input: { rehabId: id } } });
      return result;
    });
    // TODO implement try catch
    await Promise.all(deleteRehabMutations).then(results => {});
  };

  const handleBackdropOnPress: RehabRecordsDeleteProps['handleBackdropOnPress'] = () => {
    navigation.setParams({ openConfirmModal: false });
  };

  const handleCancelOnPress: RehabRecordsDeleteProps['handleCancelOnPress'] = () => {
    navigation.setParams({ openConfirmModal: false });
  };
  const handleDeleteOnPress: RehabRecordsDeleteProps['handleDeleteOnPress'] = async () => {
    navigation.setParams({ deleteMode: false, openConfirmModal: false });
    await deleteRehabs();
    await myRehabRequestsRefetch();
  };

  const handleItemOnPress: RehabRecordsProps['handleItemOnPress'] = index => (event) => {
    navigation.push("RehabRecordsDetailScreen", { detail: myRehabRequests[index]} );
  };

  const handleItemDeleteOnPress: RehabRecordsProps['handleItemDeleteOnPress'] = index => (event) => {
    const updatedRehabRecords = rehabRecords.map((record, _index) => {
      return ({ ...record, checked: _index === index ? !record.checked : record.checked })
    });
    const lengthOfSelectedRehabRecords = updatedRehabRecords.filter(record => record.checked).length;
    navigation.setParams({ lengthOfSelectedRehabRecords });
    setRehabRecords(updatedRehabRecords);
  };

  React.useEffect(() => {
    navigation.setParams({ loading: loading || deleteRehabLoading });
    return () => {}
  }, [loading, deleteRehabLoading]);

  React.useEffect(() => {
    setRehabRecords(myRehabRequests.map(item => {
      return ({ ...item, checked: false })
    }));
    return () => {}
  }, [myRehabRequests, deleteMode]);


  if (loading || deleteRehabLoading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <>
      <RehabRecordsView 
        deleteMode={deleteMode}
        handleItemOnPress={handleItemOnPress}
        handleItemDeleteOnPress={handleItemDeleteOnPress}
        rehabRecords={rehabRecords}
      />
      <RehabRecordsDeleteView
        handleBackdropOnPress={handleBackdropOnPress}
        handleCancelOnPress={handleCancelOnPress}
        handleDeleteOnPress={handleDeleteOnPress}
        lengthOfSelectedRehabRecords={lengthOfSelectedRehabRecords}
        openConfirmModal={openConfirmModal}
      />
    </>
  )
};

export default React.memo(RehabRecords);