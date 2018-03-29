import { AppRegistry, UIManager } from 'react-native';
import './src/config/ReactotronConfig';
import App from './src';

//GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('ToDoRNA', () => App);
