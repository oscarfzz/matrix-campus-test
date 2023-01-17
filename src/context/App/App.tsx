import { SnackbarProvider } from "notistack";
import React from "react";

export const AppContext = React.createContext({});
export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const value = React.useMemo(() => ({}), []);

  return <AppContext.Provider value={value}>
    <SnackbarProvider maxSnack={3}>
      {children}
    </SnackbarProvider>
  </AppContext.Provider>;
};
