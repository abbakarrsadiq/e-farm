import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/inter";
import Login from './components/login/login';
import Account from './components/signup/stepOne/create-account';
import Bank from './components/signup/StepTwo/bank-registration';
import Security from './components/signup/stepThree/security';
import Farmer from './components/signup/stepFour/farmer-account';
import Verify from './components/login/verify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/account" element={<Account />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/security" element={<Security />} />
        <Route path="/farmer" element={<Farmer />} />
      </Routes>
    </Router>
  );
}
export default App