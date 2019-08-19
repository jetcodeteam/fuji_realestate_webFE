import React, { Suspense, lazy } from 'react';
import './i18n';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { RootProvider } from './store';

const MasterLayout = lazy(() => import('./layouts/masterLayout'));
const LoginPage = lazy(() => import('./containers/loginPage'));

const App = () => (
  <RootProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <MasterLayout>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </MasterLayout>
    </Suspense>
  </RootProvider>
);

export default App;
