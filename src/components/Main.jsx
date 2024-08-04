import Header from './Header';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
}

export default Main;
