import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import AccountModal from './components/Accounts/AccountModal.jsx';
import { AppProvider } from './context/AppContext.jsx';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <AccountModal />
    </AppProvider>
  );
}

export default App;
