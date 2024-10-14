import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { Notifications } from './components/notifications';
import { AbilityContext } from './security/Can';
import ability from './security/ability';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import "boosted/dist/css/orange-helvetica.min.css";
import "boosted/dist/css/orange-helvetica.min.css.map";
import "boosted/dist/css/boosted.css";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  
  <Provider store={store}>
    <BrowserRouter>
      <AbilityContext.Provider value={ability}>
        <QueryClientProvider client={new QueryClient()}>
          <App />
          <Notifications />
        </QueryClientProvider>
      </AbilityContext.Provider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
