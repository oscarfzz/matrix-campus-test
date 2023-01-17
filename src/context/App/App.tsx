import { SnackbarProvider } from "notistack";
import React from "react";

export const AppContext = React.createContext({
  routerStatus: 'loading',
});

type Props = {
  children: React.ReactNode;
  routerStatus: 'loading' | 'ready' | 'error';
}

export const AppProvider = ({ children, routerStatus }: Props) => {

  const value = React.useMemo(() => ({
    routerStatus,
  }), [routerStatus]);

  return <AppContext.Provider value={value}>
    <SnackbarProvider maxSnack={3}>
      {children}
    </SnackbarProvider>
  </AppContext.Provider>;
};
