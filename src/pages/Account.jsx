import React, { useState } from 'react';
import axios from 'axios';

const Account = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [pronouns, setPronouns] = useState(user.pronouns || '');
  const [timezone, setTimezone] = useState(user.timezone || '');
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = async () => {
    const updatedUser = { ...user, username, email, pronouns, timezone, bio };
    try {
      const response = await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      if (response.status === 200) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="account-details-container">
      <h2>Account Details</h2>
      {isEditing ? (
        <div className="account-details">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pronouns">Pronouns:</label>
            <input
              type="text"
              id="pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              placeholder="e.g. she/her, he/him, they/them"
            />
          </div>
          <div className="form-group">
            <label htmlFor="timezone">Timezone:</label>
            <input
              type="text"
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="e.g. GMT-5, PST, CET"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself"
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="account-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Pronouns:</strong> {user.pronouns || 'Not specified'}</p>
          <p><strong>Timezone:</strong> {user.timezone || 'Not specified'}</p>
          <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
          <button onClick={() => setIsEditing(true)}>Edit Account</button>
        </div>
      )}
    </div>
  );
};

export default Account;
