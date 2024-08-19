import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../maindegital/MainDegital.css';

const DigitalSignature: React.FC = () => {
  const navigate = useNavigate();

  const navigateToLogin = (): void => {
    navigate('/login');
  };

  const navigateToRegister = (): void => {
    navigate('/register');
  };

  return (
    <div >
      {/* TopBar */}
      <div className="topbar">
        <div className="app-name">D-sign</div>
        <div className="auth-buttons">
          <button onClick={navigateToLogin}>Login</button>
          <button onClick={navigateToRegister}>Register</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="digital-signature-container">

        <h1 className="welcome-message">Welcome to Digital Signature App</h1>
        <p>
          We are delighted to have you here. This application helps you sign documents securely and efficiently.
        </p>
        <section className="privacy-policy">
          <h2>Privacy Policy</h2>
          <p>
            We are committed to ensuring the security of your information. All data entered in this application is encrypted and securely stored. We do not share your information with third parties without your consent.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="footer">
        © 2024 All Rights Reserved
      </div>
    </div>
  );
};

export default DigitalSignature;
