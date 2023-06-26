/**
 * Savinder Singh 15 Nov 2021
 * 
 *
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Routes from './app/navigator/Routes';
import configStore from './app/redux/configStore';
import Toast  from 'react-native-toast-message';
import { toastConfig } from './app/views/hoc/Toast';
import { LogBox } from 'react-native';

const App = () => {

  useEffect(() => {
    _init()
    return () => {
    }
  }, [])


  const _init = () => {
      LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
      LogBox.ignoreAllLogs();//Ignore all log notifications
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

 
  return (
    <Provider store={configStore}>
        <Routes />
        <Toast 
            ref={(ref) => Toast.setRef(ref)} 
            config={toastConfig}    
        /> 
    </Provider>
  );
};

export default App;


// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

// cd android && ./gradlew assembleDebug

// ./gradlew bundleRelease