import { gql } from 'apollo-boost';
import { omit, sortBy } from 'lodash';
import React from 'react';
import { ListItemProps } from 'react-native-elements'
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import NumberFormat from 'react-number-format';


import { useMutation } from '@apollo/react-hooks';

import FullRemodelSummaryView from './FullRemodelSummaryView';
import { FiximizeFlow } from '../FiximizeQuestions/Autocomplete';
import { LoadingComponent } from '../InitialLoading';
import { CreateRehab, CreateRehab_createRehab_rehabItemPackage_rehabItems, CreateRehabVariables } from '../../generated/CreateRehab';

// TODO move it to other file location

export interface Params {
  flow: FiximizeFlow;
  arv?: CreateRehab['createRehab']['arv'];
  asIs?: number;
  createRehabInput?: CreateRehabVariables['input'];
  createRehabNoArvInput?: object;
  submitted?: boolean;
  totalDebts?: number;
  vacant?: boolean;
};

type ScreenProps = {};

export type FullRemodelSummaryProps = {
  data: FullRemodelSummaryState['data'];
  handleCheckBoxOnPress(i: number): ListItemProps['checkBox']['onPress'];
  handleOnPress: ButtonProps['onPress'];
  totalCost: number;
};

export type FullRemodelSummaryState = {
  arv: Params['arv'];
  data: RehabItemsPackage[];
  rehabId: CreateRehab['createRehab']['rehabId'];
  rehabItems: Omit<CreateRehab_createRehab_rehabItemPackage_rehabItems, "__typename">[];
  rehabItemPackageId: CreateRehab['createRehab']['rehabItemPackage']['id'];
};

type RehabItemsPackage = {
  // TODO change to ENUM
  category: string;
  order: number;
  selected: boolean;
  value: number;
};

type RehabItemsPackageMap = {
  [key: string]: {
    cost: number;
    order: number;
    selected: boolean;
  }
}

const CREATE_REHAB = gql`
  mutation CreateRehab($input: CreateRehabInput!) {
    createRehab(input: $input) {
      arv
      rehabId
      rehabItemPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
        }
        submitted
      }
    }
  }
`;

const CREATE_REHAB_NO_ARV = gql`
  mutation CreateRehabNoArv($input: CreateRehabNoArvInput!) {
    createRehabNoArv(input: $input) {
      arv
      rehabId
      rehabItemPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
        }
        submitted
      }
    }
  }
`;

const GetOrderForRehabItemsCategory = (key: string) => {
  switch (key) {
    case "Kitchen": 
      return 0;
    case "Full Bath": 
      return 1;
    case "Flooring": 
      return 2;
    case "Interior Paint": 
    case  "Paint - Walls":
      return 3;
    case "Clean up": 
      return 4;
    case "Staging": 
      return 5;
    default:
      return 6;
  }
};

const FullRemodelSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const [createRehab] = useMutation<CreateRehab, CreateRehabVariables>(CREATE_REHAB);
  const [createRehabNoArv] = useMutation(CREATE_REHAB_NO_ARV);

  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const createRehabInput = navigation.getParam("createRehabInput", null);
  const flow = navigation.getParam("flow", null);

  const totalDebts = createRehabInput.totalDebts;
  const vacant = createRehabInput.vacant;
  const asIs = createRehabInput.asIs;

  const [arv, setArv] = React.useState<FullRemodelSummaryState['arv']>();
  const [data, setData] = React.useState<FullRemodelSummaryState['data']>();
  const [rehabId, setRehabId] = React.useState<FullRemodelSummaryState['rehabId']>();
  const [rehabItems, setRehabItems] = React.useState<FullRemodelSummaryState['rehabItems']>();
  const [rehabItemPackageId, setRehabItemPackageId] = React.useState<FullRemodelSummaryState['rehabItemPackageId']>();
  const [submitted, setSubmitted] = React.useState(navigation.getParam("submitted", false));

  const updatedArv = navigation.getParam("arv", null);
  const updatedAsIs = navigation.getParam("asIs", null);
  const updatedSubmitted = navigation.getParam("submitted", false);
  const updatedVacant = navigation.getParam("vacant", null);

  const bootstrapAsync = async () => {
    try {
      let result;
      if (flow === FiximizeFlow.AutoCompleteAddress) {
        result = await createRehab({ variables: { input: createRehabInput } });
      } else {
        result = await createRehabNoArv({ variables: { input: createRehabNoArvInput }})
      }
      if (result) {
        let rehab = flow === FiximizeFlow.AutoCompleteAddress ? result.data.createRehab : result.data.createRehabNoArv;
        const itemsMap: RehabItemsPackageMap = result.data.createRehab.rehabItemPackage.rehabItems.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = {
              cost: item.cost,
              selected: item.selected,
            }
          } else {
            acc[item.category]["cost"] += item.cost;
          };
          acc[item.category]['order'] = acc[item.category]['order'] || GetOrderForRehabItemsCategory(item.category);
          return acc;
        }, {});

        let dataArry: FullRemodelSummaryState['data'] = [];
        for (let [key, value] of Object.entries(itemsMap)) {
          dataArry.push({ category: key, value: value.cost, selected: value.selected, order: value.order });
        };
        setArv(rehab.arv);
        setData(sortBy(dataArry, ["order"]));
        setRehabId(rehab.rehabId);
        setRehabItems(rehab.rehabItemPackage.rehabItems.map(item => {
          return omit(item, ["__typename"]);
        }));
        setRehabItemPackageId(rehab.rehabItemPackage.id);
        setSubmitted(rehab.rehabItemPackage.submitted);
      }
    } catch (e) {
      console.log("createRehab e", e)
    }
  };

  const handleCheckBoxOnPress: FullRemodelSummaryProps['handleCheckBoxOnPress'] = (i) => () => {
    const result = data.map((item, index) => {
      if (index === i) {
        item.selected = !data[i].selected
      }
      return item;
    });
    const updatedRehabItems = rehabItems.map((item) => {
      if (item.category === data[i].category) {
        item.selected = !item.selected;
      }
      return item;
    });
    setData(result);
    setRehabItems(updatedRehabItems);
  };

  const totalCost = React.useMemo<FullRemodelSummaryProps['totalCost']>(() => {
    const cost = (data || []).reduce((acc, item) => {
      if (item.selected) {
        acc += item.value;
      }
      return acc;
    }, 0);
    return cost;
  }, [data]);

  const handleOnPress = React.useCallback<FullRemodelSummaryProps['handleOnPress']>(() => {
    navigation.navigate("ProfitSummaryScreen", { 
      rehabId,
      totalDebts,
      arv: updatedArv ? updatedArv : arv, 
      asIs: updatedAsIs ? updatedAsIs: asIs,
      rehabItemPackage: {
        rehabItems,
        id: rehabItemPackageId,
      },
      remodellingCost: totalCost, 
      step: "summary",
      submitted: updatedSubmitted ? updatedSubmitted : submitted,
      vacant: updatedVacant ? updatedVacant: vacant,
    });
  }, [arv, asIs, data, rehabId, rehabItems, rehabItemPackageId, setArv, submitted,
    updatedArv, updatedAsIs, updatedSubmitted, updatedVacant, vacant]);

  React.useEffect(() => {
    console.log("FullRemodelSummary Mount");
    bootstrapAsync();
    return () => {
      console.log("FullRemodelSummary UnMount");
    }
  }, [submitted]);

  if (!data) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <FullRemodelSummaryView 
      data={data}
      handleCheckBoxOnPress={handleCheckBoxOnPress}
      handleOnPress={handleOnPress}
      totalCost={totalCost}
    />
  )
};

export default React.memo(FullRemodelSummary);