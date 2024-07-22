import React from "react";
import "./TopUsers.css";

const TopUsers = ({ users }) => {
  return (
    <div className="top-users">
      {users.slice(0, 3).map((user, index) => (
        <div className={`top-user rank-${index + 1}`} key={index}>
          {index === 0 && <span className="crown">👑</span>}
          <span className="rank-number">{index + 1}</span>
          <div className="rank-icon">
            <img src={user.img} alt={`${user.name}'s profile`} />
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-level">LV.{user.level}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopUsers;
