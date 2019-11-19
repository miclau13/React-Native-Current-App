import * as SecureStore from 'expo-secure-store';
import React from 'react';

import LoggedInContext from './LoggedInContext';

export type LoggedInProviderProps<T extends string> = {
  children: React.ReactNode;
};

const Provider = LoggedInContext.Provider;

const LoggedInProvider = <T extends string>({
  children
}: LoggedInProviderProps<T>) => {

  const [value, setValue] = React.useState(false);

  const bootstrapAsync = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken", {});
    if (accessToken) {
      setValue(true);
    }
  };

  React.useEffect(() => {
    console.log("LoggedInProvider Mount");
    bootstrapAsync();
    return () => {console.log("LoggedInProvider UnMount")}
  }, [value]);

  // console.log("LoggedInProvider", value);

  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
}

export default LoggedInProvider;
