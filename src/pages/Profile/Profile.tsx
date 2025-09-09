import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>
        
        <div className="profile-content">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <form className="profile-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" defaultValue="John" />
                <input type="text" placeholder="Last Name" defaultValue="Doe" />
              </div>
              <input type="email" placeholder="Email" defaultValue="john.doe@example.com" />
              <input type="tel" placeholder="Phone" defaultValue="+32 123 456 789" />
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
          
          <div className="profile-section">
            <h3>Address Information</h3>
            <form className="profile-form">
              <input type="text" placeholder="Address" defaultValue="123 Diamond Street" />
              <div className="form-row">
                <input type="text" placeholder="City" defaultValue="Antwerp" />
                <input type="text" placeholder="Postal Code" defaultValue="2000" />
              </div>
              <select defaultValue="BE">
                <option value="BE">Belgium</option>
                <option value="NL">Netherlands</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


