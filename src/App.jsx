import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import AccountModal from './components/Accounts/AccountModal.jsx';
import AppProviders from './context/ContextProviders.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import PostList from './components/Posts/PostList.jsx';

function App() {
  return (
    <AppProviders>
      <Navbar />
      <AccountModal />
      <Sidebar />
      <PostList />
    </AppProviders>
  );
}

export default App;
