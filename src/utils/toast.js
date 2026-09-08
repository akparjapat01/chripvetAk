import {showMessage} from 'react-native-flash-message';
//  'info' | 'danger' | 'success' | 'warning' | 'default'
export const show = (message, type) => {
    console.log(message);
  showMessage({
    message: 'Message',
    description: message,
    type: type,
    hideStatusBar: true,
    duration: 3000,
    autoHide: true,
  });
};
