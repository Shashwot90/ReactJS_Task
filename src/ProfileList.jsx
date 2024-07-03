
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileList = ({ items }) => {
  return (
    <div>
      <h1>Profiles</h1>
      <Link to="/">Back to Home</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {

            const profilePictureUrl = item.profilePicture ? URL.createObjectURL(item.profilePicture) : null;
            return(

            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.dob}</td>
              <td>{item.city}</td>
              <td>{item.district}</td>
              <td>{item.province}</td>
              <td>{item.country}</td>
              {profilePictureUrl && (
                  <div>
                   
                    <img
                      src={profilePictureUrl}
                      alt={`${item.name}'s profile`}
                      style={{ width: '100px', height: '100px' }}
                    />
                  </div>
                )}
            </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileList;



 
