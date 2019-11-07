import React from 'react';

const LoggedInContext = React.createContext({});

export const LoggedInContextConsumer = LoggedInContext.Consumer;

export default LoggedInContext;