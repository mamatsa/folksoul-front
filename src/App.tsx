import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from 'pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<h1>დილამშვიდობისა!</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
