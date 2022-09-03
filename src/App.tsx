import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Login,
  Dashboard,
  BandMembers,
  SocialLinks,
  About,
  Landing,
  NotFound,
} from 'pages';
import { AddBandMember } from 'pages/BandMembers/components';
import { AddSocialLink } from 'pages/SocialLinks/components';
import { EditBandInfo } from 'pages/About/components';

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
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login onLogin={loginHandler} />} />
        {token && <Route path='/dashboard' element={<Dashboard />} />}
        {token && <Route path='/band-members' element={<BandMembers />} />}
        {token && (
          <Route path='/band-members/add-member' element={<AddBandMember />} />
        )}
        {token && (
          <Route
            path='/band-members/update-member/:memberId'
            element={<AddBandMember />}
          />
        )}
        {token && <Route path='/social-links' element={<SocialLinks />} />}
        {token && (
          <Route
            path='/social-links/add-social-link'
            element={<AddSocialLink />}
          />
        )}
        {token && (
          <Route
            path='/social-links/update-social-link/:socialLinkId'
            element={<AddSocialLink />}
          />
        )}
        {token && <Route path='/about-band' element={<About />} />}
        {token && <Route path='/about-band/edit' element={<EditBandInfo />} />}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
