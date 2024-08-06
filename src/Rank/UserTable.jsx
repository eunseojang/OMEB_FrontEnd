import React from 'react';
import './UserTable.css';

const UserTable = ({ users }) => {
  return (
    <div className="user-tables">
      <div className="info-container">
        <span
          className="material-icons"
          data-tooltip="하루에 한번 로그인, 책 리뷰를 남기기, 좋아요 누르기/받기 등으로 레벨을 올릴 수 있어요"
        >
          info
        </span>
      </div>

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
