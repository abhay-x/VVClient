import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import AccountModal from './components/Accounts/AccountModal.jsx';
import { AppProvider } from './context/AppContext.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import PostList from './components/Posts/PostList.jsx';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <AccountModal />
      <div className='flex '>
        <Sidebar />
        <PostList />
      </div>
    </AppProvider>
  );
}

export default App;
