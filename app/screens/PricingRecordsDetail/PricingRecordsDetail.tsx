import { capitalize, reduce } from 'lodash';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {
  detail: object;
};

type ScreenProps = {};

const PricingRecordsDetail: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const detail = navigation.getParam("detail", null);

  const detailList = reduce(detail,  function(result, value, key) {
    switch (key) {
      case "package" :
        // TODO temp fix kitchen
        if (!value["bathroomRemodel"]) {
          result.push({ name: "Maintain Floor ", value : capitalize(value["maintainFloor"]) });
        } else {
          result.push({ name: "Bathroom Remodel" });
          result.push({ name: "Bathtub", value : value["bathroomRemodel"]["bathtub"], style: { paddingLeft: 8 } });
          result.push({ name: "Fiber Glass Shower Door", value : value["bathroomRemodel"]["fiberGlassShowerDoor"], style: { paddingLeft: 8 } });
          result.push({ name: "Medicine Cabinet", value : value["bathroomRemodel"]["medicineCabinet"], style: { paddingLeft: 8 } });
          result.push({ name: "Mirror", value : value["bathroomRemodel"]["mirror"], style: { paddingLeft: 8 } });
          result.push({ name: "Shower Stall", value : value["bathroomRemodel"]["showerStall"], style: { paddingLeft: 8 } });
          result.push({ name: "Sink", value : value["bathroomRemodel"]["sink"], style: { paddingLeft: 8 } });
          result.push({ name: "Toilet", value : value["bathroomRemodel"]["toilet"], style: { paddingLeft: 8 } });
          result.push({ name: "Vanity", value : value["bathroomRemodel"]["vanity"], style: { paddingLeft: 8 } });
  
          result.push({ name: "Maintain Floor ", value : capitalize(value["maintainFloor"]) });
          if (value["maintainFloor"] === "yes") {
            result.push({ name: "Bath/ShowerWall", value : value["bathroomFloorRemodel"]["bathOrShowerWall"], style: { paddingLeft: 8 } });
            result.push({ name: "Bathroom Ceiling", value : value["bathroomFloorRemodel"]["bathroomCeiling"], style: { paddingLeft: 8 } });
            result.push({ name: "Bathroom Floor", value : value["bathroomFloorRemodel"]["bathroomFloor"], style: { paddingLeft: 8 } });
            result.push({ name: "Bathroom Wall", value : value["bathroomFloorRemodel"]["bathroomWall"], style: { paddingLeft: 8 } });
            result.push({ name: "Floor/Wall/Ceiling Repairs", value : value["bathroomFloorRemodel"]["floorOrWallOrCeilingRepairs"], style: { paddingLeft: 8 } });
          } else {
            result.push({ name: "Enhance Bathroom", value : capitalize(value["enhanceBathroom"]) });
          }
        }
        break;
      case "postalCode" :
        result.push({ name: "Zip Code", value });
        break;
      default: 
        break;
    }
    return result;
  }, []);

  React.useEffect(() => {
    console.log("PricingRecordsDetail Mount");
    return () => {console.log("PricingRecordsDetail UnMount")}
  }, []);

  return (
    <View>
      <ScrollView>
        {
          detailList.map((item, i) => (
            <ListItem
              bottomDivider
              key={i}
              title={item.name}
              rightTitle={item.value}
              titleStyle={item.style}
            />
          ))
        }
      </ScrollView>
    </View>
  )
};

export default React.memo(PricingRecordsDetail);