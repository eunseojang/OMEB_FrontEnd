import React from "react";
import "./UserTable.css";

const UserTable = ({ users }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>랭킹</th>
          <th>사용자 이름</th>
          <th>레벨</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 4}</td>
            <td>
              <img
                src={user.img}
                alt={`${user.name}'s profile`}
                className="user-img"
              />
              {user.name}
            </td>
            <td>LV.{user.level}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
