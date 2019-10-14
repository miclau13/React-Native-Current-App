import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import BathroomRemodelFormik from '../../components/BathroomRemodelFormik';
import MaintainFloor from '../MaintainFloor';
import ZipCode from '../ZipCode';

interface QuestionScreenProps {
  choice: string;
  navigation: NavigationStackScreenProps['navigation'];
};

type Params = {
  // questionScreen: React.ComponentType<QuestionScreenProps>;
  // TODO change to ENUM
  choice: string;
  // TODO change to ENUM
  nextQuestionScreen: string;
};

type ScreenProps = {};

type BathroomRemodelField = {
  bathtub: number;
  showerStall: number;
  toilet: number;
  sink: number;
  vanity: number;
  medicineCabinet: number;
  mirror: number;
  fiberGlassShowerDoor: number;
}

type BathroomFloorRemodelField = {
  bathroomFloor: number,
  bathOrShowerWall: number,
  bathroomWall: number,
  bathroomCeiling: number,
  floorOrWallOrCeilingRepairs: number,
}

export interface BathroomRemodelFormValues {
  zipCode: string;
  maintainFloor: string;
  enhanceBathroom: string;
  bathroomRemodel: BathroomRemodelField;
  bathroomFloorRemodel: BathroomFloorRemodelField;
}

const BathroomRemodelForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: "",
      maintainFloor: "",
      enhanceBathroom: "",
      bathroomRemodel: {
        bathtub: null,
        showerStall: null,
        toilet: null,
        sink: null,
        vanity: null,
        medicineCabinet: null,
        mirror: null,
        fiberGlassShowerDoor: null,
      },
      bathroomFloorRemodel: {
        bathroomFloor: null,
        bathOrShowerWall: null,
        bathroomWall: null,
        bathroomCeiling: null,
        floorOrWallOrCeilingRepairs: null,
      },
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    // maintainFloor: yup.string().required('Maintain Floor is Required'),
    // enhanceBathroom: yup.string().required('Enhance Bathroom is Required'),
    // bathroomRemodel: yup.object().shape({
    //   bathtub: yup.number().positive('Bathtub answer is Required'),
    //   showerStall: yup.number().positive('Shower Stall answer is Required'),
    //   toilet: yup.number().positive('Toilet answer is Required'),
    //   sink: yup.number().positive('Sink answer is Required'),
    //   vanity: yup.number().positive('Vanity answer is Required'),
    //   medicineCabinet: yup.number().positive('Medicine Cabinet answer is Required'),
    //   mirror: yup.number().positive('Mirror answer is Required'),
    //   fiberGlassShowerDoor: yup.number().positive('Fiber Glass Shower Door answer is Required'),
    // }),
    // bathroomFloorRemodel: yup.object().shape({
    //   bathroomFloor: yup.number().positive('Bathroom Floor answer is Required'),
    //   bathOrShowerWall: yup.number().positive('Bath/Shower Wall answer is Required'),
    //   bathroomWall: yup.number().positive('Bathroom Wall answer is Required'),
    //   bathroomCeiling: yup.number().positive('Bathroom Ceiling answer is Required'),
    //   floorOrWallOrCeilingRepairs: yup.number().positive('Floor/Wall/Ceiling Repairs answer is Required'),
    // }),
  }), []);
  const onSubmit = React.useCallback(values => {
    navigation.navigate("BathroomRemodelFormScreen", { nextQuestionScreen: "maintainFloor" });
  }, [])

  const { navigation } = props;
  const choice = navigation.getParam("choice", "");
  const nextQuestionScreen = navigation.getParam("nextQuestionScreen", "zipCode");

  React.useEffect( () => {
    console.log("BathroomRemodelForm Mount");
    return () => {console.log("BathroomRemodelForm UnMount")}
  }, []);

  // console.log("BathroomRemodelForm navigation",navigation)
  
  return (
    <BathroomRemodelFormik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {/* {questionScreen && React.createElement(questionScreen, { choice, navigation }) } */}
      {/* {nextQuestionScreen === "zipCode" ? 
        <ZipCode choice={choice} navigation={navigation} />
        : null
      }
      {nextQuestionScreen === "maintainFloor" ? 
        <MaintainFloor navigation={navigation} />
        : null
      } */}
      <View style={styles.container}>
        {nextQuestionScreen === "zipCode" ? 
          <ZipCode choice={choice} navigation={navigation} />
          : null
        }
        {nextQuestionScreen === "maintainFloor" ? 
          <MaintainFloor navigation={navigation} />
          : null
        }
      </View>
      
      {/* <MaintainFloor navigation={navigation} /> */}
      
    </BathroomRemodelFormik>
  )
};

export default React.memo(BathroomRemodelForm);