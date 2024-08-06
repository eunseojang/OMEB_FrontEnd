import React from "react";
import "./TopUsers.css";
import 일등_trophy from "../assets/rangking/일등_trophy.png";
import 이등_trophy from "../assets/rangking/이등_trophy.png";
import 삼등_trophy from "../assets/rangking/삼등_trophy.png";

const TopUsers = ({ users }) => {
  return (
    <div className="top-users">
      {users.slice(0, 3).map((user, index) => {
        let trophyImage;
        if (index === 0) {
          trophyImage = 일등_trophy;
        } else if (index === 1) {
          trophyImage = 이등_trophy;
        } else if (index === 2) {
          trophyImage = 삼등_trophy;
        }

        return (
          <div className={`top-user rank-${index + 1}`} key={index}>
            {/* 회색 사각형 */}
            <div className="gray-box"></div>

            {/* 트로피 이미지 */}
            <div className="trophy-icon">
              <img src={trophyImage} alt={`Rank ${index + 1} trophy`} />
            </div>

            {/* 사용자 프로필 이미지*/}
            <div className="rank-icon">
              <img
                src={user.profileImageUrl}
                alt={`${user.nickname}'s profile`}
              />
            </div>

            {/* 사용자 정보 (이름, 레벨) */}
            <div className="user-info">
              <div className="user-name">{user.nickname}</div>
              <div className="user-level1">LV.{user.level}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopUsers;
