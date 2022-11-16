import { Breadcrumb } from 'antd';

function NavBreadcrumb() {
  const { pathname } = window.location;

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <span className="breadcrum-txt">DCA</span>
      </Breadcrumb.Item>
      {pathname === '/dashboard' ? (
        <Breadcrumb.Item>
          <a href="/">
            <span className="breadcrum-txt">Create Position</span>
          </a>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item>
          <a href="/dashboard">Dashboard</a>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
export default NavBreadcrumb;
