import React from "react";
import TopUsers from "./TopUsers";
import UserTable from "./UserTable";


const mockData = [
  {
    name: "김일등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김이등",
    level: 80,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김삼등",
    level: 76,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김사등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김오등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김육등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김칠등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김팔등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김구등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
  {
    name: "김십등",
    level: 90,
    img: "https://image.idus.com/image/files/da17e0c53a4e480284c5d49932722e5a.jpg",
  },
];

function RankingPage() {
  return (
    <div className="rank">
      <TopUsers users={mockData} />
      <UserTable users={mockData.slice(3)} />
    </div>
  );
}

export default RankingPage;