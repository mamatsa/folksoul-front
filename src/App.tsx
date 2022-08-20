import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Dashboard, BandMembers } from 'pages';

const App = () => {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token as string);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Welcome</h1>} />
        <Route path='/login' element={<Login onLogin={loginHandler} />} />
        {token && <Route path='/dashboard' element={<Dashboard />} />}
        {token && <Route path='/band-members' element={<BandMembers />} />}
      </Routes>
    </Router>
  );
};

export default App;
