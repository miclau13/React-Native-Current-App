import { gql } from 'apollo-boost';
import React from 'react';
import { FlatList } from 'react-native';
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
      contactPhoneNumber
      postalCode
      propertyDetails
      totalDebts
      vacant

      beds
      fullBaths
      halfBaths
      threeQuarterBaths
      sqft
      style

      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
        }
        revisedRehabItems {
          category
          cost
          name
          selected
          roomName
          notes
          measurement
          measurementUnit
        }
        submitted
        taxRate
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
  myRehabRequests: MyRehabRequests_myRehabRequests[];
};

type ScreenProps = {};

interface RehabRecords extends MyRehabRequests_myRehabRequests {
  checked: boolean;
};

export type RehabRecordsDeleteViewProps = {
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleCancelOnPress: ButtonProps['onPress'];
  handleDeleteOnPress: ButtonProps['onPress'];
  lengthOfSelectedRehabRecords: number;
  openConfirmModal: boolean;
}

export type RehabRecordsViewProps = {
  deleteMode: boolean;
  index: number;
  handleItemOnPress(index: number): ListItemProps['onPress'];
  handleItemDeleteOnPress(index: number): IconProps['onPress'];
  rehabRecord: RehabRecords;
};

const RehabRecords: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const deleteMode = navigation.getParam("deleteMode", false);
  const lengthOfSelectedRehabRecords = navigation.getParam("lengthOfSelectedRehabRecords", 0);
  const openConfirmModal = navigation.getParam("openConfirmModal", false);
  const { data, loading, refetch: myRehabRequestsRefetch } = useQuery<MyRehabRequests>(MY_REHAB_REQUESTS);
  const [deleteRehab, { loading: deleteRehabLoading }] = useMutation<DeleteRehab, DeleteRehabVariables>(DELETE_REHAB);
  
  const myRehabRequests = data?.myRehabRequests || [];
  const [isRefreshing, setIsRefreshing] = React.useState(false);
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

  // For RehabRecordsDeleteView
  const handleBackdropOnPress: RehabRecordsDeleteViewProps['handleBackdropOnPress'] = () => {
    navigation.setParams({ openConfirmModal: false });
  };
  const handleCancelOnPress: RehabRecordsDeleteViewProps['handleCancelOnPress'] = () => {
    navigation.setParams({ openConfirmModal: false });
  };
  const handleDeleteOnPress: RehabRecordsDeleteViewProps['handleDeleteOnPress'] = async () => {
    navigation.setParams({ deleteMode: false, openConfirmModal: false });
    setIsRefreshing(true);
    await deleteRehabs();
    await myRehabRequestsRefetch();
    setIsRefreshing(false);
  };

  // For RehabRecordsView
  const handleItemOnPress: RehabRecordsViewProps['handleItemOnPress'] = index => (event) => {
    navigation.navigate({ routeName: "RehabRecordsDetailScreen", params: { detail: rehabRecords[index], submitted: rehabRecords[index].rehabItemsPackage.submitted } });
  };
  const handleItemDeleteOnPress: RehabRecordsViewProps['handleItemDeleteOnPress'] = index => (event) => {
    const updatedRehabRecords = rehabRecords.map((record, _index) => {
      return ({ ...record, checked: _index === index ? !record.checked : record.checked })
    });
    const lengthOfSelectedRehabRecords = updatedRehabRecords.filter(record => record.checked).length;
    navigation.setParams({ lengthOfSelectedRehabRecords });
    setRehabRecords(updatedRehabRecords);
  };
  const onRefresh = async () => {
    setIsRefreshing(true); // true isRefreshing flag for enable pull to refresh indicator
    try {
      await myRehabRequestsRefetch();
    } catch (error) {
      console.log("refetch error", error)
    };
    setIsRefreshing(false);
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item, index }) => {
    return (
      <RehabRecordsView 
        deleteMode={deleteMode}
        handleItemOnPress={handleItemOnPress}
        handleItemDeleteOnPress={handleItemDeleteOnPress}
        index={index}
        rehabRecord={item}
      />
    );
  }

  React.useEffect(() => {
    navigation.setParams({ loading: loading || deleteRehabLoading });
    return () => {}
  }, [loading, deleteRehabLoading]);

  React.useEffect(() => {
    setRehabRecords(myRehabRequests.map(item => {
      return ({ ...item, checked: false })
    }));
    navigation.setParams({ myRehabRequests });
    return () => {}
  }, [data, deleteMode]);

  React.useEffect(() => {
    const didFoucsSubscription = navigation.addListener('didFocus', async payload => {
      setIsRefreshing(true);
      await myRehabRequestsRefetch();
      setIsRefreshing(false);
    });
    return () => {
      didFoucsSubscription.remove();
    }
  }, []);

  if (loading || deleteRehabLoading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <>
      <FlatList
        data={rehabRecords}
        refreshing={isRefreshing}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        renderItem={renderItem}
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