import {Outlet} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Layout = props => (
  <>
    <Navigation></Navigation>
    <main className="Layout-Content">
      <Outlet/>
    </main>
  </>
);

export default Layout;
