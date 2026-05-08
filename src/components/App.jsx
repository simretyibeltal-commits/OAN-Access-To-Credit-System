import { useState } from 'react';

import Dashboard from './dashboard/loan-application-dashboard.jsx';
import LoginPage from './login-page/LoginPage.jsx';

function App() {
  const [screen, setScreen] = useState('login');

  if (screen === 'loan-application-dashboard') {
    return <Dashboard onLogout={() => setScreen('login')} />;
  }

  return <LoginPage onSignIn={() => setScreen('loan-application-dashboard')} />;
}

export default App;