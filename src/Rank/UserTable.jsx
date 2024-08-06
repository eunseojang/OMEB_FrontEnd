import React from "react";
import "./UserTable.css";

const UserTable = ({ users }) => {
  return (
    <div className="user-tables">
  
      {users.map((user, index) => (
        <div key={index + 4} className="user-table">
          <div className="user-rank">{index + 4}</div>
          <div className="user-info">
            <img
              src={user.profileImageUrl}
              alt={`${user.nickname}'s profile`}
              className="user-img"
            />
          </div>
          <div className="user-name">{user.nickname}</div>
          <div className="user-level">LV. {user.level}</div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
