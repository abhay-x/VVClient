import React, { createContext, useState, useContext } from 'react';

// A generic function to create a context and its associated hook
export function createContextHook(defaultValues, hookName) {
  const Context = createContext();

  function useCustomContext() { //eg. useAuthContext
    const context = useContext(Context);
    if (!context) {
      throw new Error(`use${hookName} must be used within a ${hookName.replace(/^\w/, (c) => c.toUpperCase())}Provider`);
    }
    return context;
  }

  function CustomProvider({ children }) { //eg. AuthProvider
    // Define context-specific state and functions here
    const [state, setState] = useState(defaultValues);

    // Provide the context values to the children components
    const contextValue = {
      ...state, // Spread the context state
      setState, // Include the setState function
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  return { useCustomContext, CustomProvider };
}
