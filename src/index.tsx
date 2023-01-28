import { ThemeProvider } from '@mui/material';
import React, { StrictMode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { APP_ROOT_ID } from './application.constants';
import App from './components/App';
import ErrorFallback from './components/ErrorFallback';
import './i18n';
import store from './store';
import './styles/index.css';
import theme from './theme';

ReactDOM.createRoot(document.getElementById(APP_ROOT_ID) as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HashRouter>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </DndProvider>
        </Provider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
