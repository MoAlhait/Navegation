import React, { useState } from "react";
import "./SplashPage.css";

const SplashPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (name && email) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsModalOpen(true);
      }, 1000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="splash-page">
      <h2 className="title">Navegation</h2>
      {!isModalOpen && (
        <div className="form-container">
          <input type="text" placeholder="Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <button onClick={handleSubmit} className="submit-button">
            submit
          </button>
        </div>
      )}
      {isLoading && <div className="loading">Loading...</div>}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Success!</h3>
            <p>Thanks! We'll let you off the waitlist soon.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashPage;
