import React from 'react';
import LoggedInContext from './LoggedInContext';

export default function useLoggedIn() {
  const ctx = React.useContext(LoggedInContext);
  console.log("useLoggedIn ctx", ctx)
  if (ctx == null) {
    throw new Error(
      `useLoggedIn hook can only be called inside the body of a function component ` +
        `that is descendant of LoggedInsProvider.`,
    );
  }
  return ctx;
}