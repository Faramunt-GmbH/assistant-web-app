import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Loader from './components/Loader';
import AssistantPage from './pages/assistant/AssistantPage';
import HistoryPage from './pages/assistant/HistoryPage';
import LoginPage from './pages/LoginPage';
import { getUser, User } from './services/authService';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser().then(() => {});
  }, []);

  const loadUser = async () => {
    setLoading(true);
    const user = await getUser();
    setUser(user);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="p-16">
        <Loader />
      </div>
    );

  if (!user) return <LoginPage onLoginHook={loadUser} />;

  return (
    <Router>
      <Routes>
        <Route index element={<AssistantPage />} />
        <Route path=":id" element={<AssistantPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
