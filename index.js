/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (!global.WebAssembly) {
    global.WebAssembly = require('webassemblyjs');
  }
  import 'react-native-get-random-values';
  import '@expo/browser-polyfill';
  
AppRegistry.registerComponent(appName, () => App);
