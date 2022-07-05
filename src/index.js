import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/store';
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#482880"
    },
    // secondary: {
    //   main: "#000000"
    // }
  }
});

// Or Create your Own theme:
// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: '#E33E7F'
//     }
//   }
// });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={5}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
// serviceWorker.unregister();


reportWebVitals();
