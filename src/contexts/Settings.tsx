import React, { useState } from 'react';

interface SettingsContextInterface<T> {
  settings: T;
  // setSettings: (settings: T) => void;
  setSettings: React.Dispatch<React.SetStateAction<T>>;
}
interface Settings {
  limitFiftyRows: boolean;
}
export const SettingsContext = React.createContext(
  {} as SettingsContextInterface<Settings>
);

const GlobalSettings = (props: React.PropsWithChildren<{}>) => {
  const [settings, setSettings] = useState({
    limitFiftyRows: true,
  } as Settings);

  // const setSettings = (
  //   settings: SettingsContextInterface<Settings>['settings']
  // ) => {
  //   setSettingsDefault((prev) => ({ ...prev, settings }));
  // };
  return (
    <SettingsContext.Provider value={{ setSettings, settings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default GlobalSettings;
