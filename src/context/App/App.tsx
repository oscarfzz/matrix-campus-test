import React from "react";

export const AppContext = React.createContext({});
export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const value = React.useMemo(() => ({}), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
