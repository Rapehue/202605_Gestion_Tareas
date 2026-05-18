import Sidebar from './Sidebar';
import Header from './Header';
import './layout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-area">

        <Header />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
};

export default MainLayout;