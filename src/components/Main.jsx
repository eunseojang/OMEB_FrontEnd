import Header from "./Header";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Main;
