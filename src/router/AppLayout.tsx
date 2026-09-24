import { Layout, Menu } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Path } from './paths';

const { Header, Content } = Layout;

const NAV_ITEMS = [
    { key: Path.Home, label: <NavLink to={Path.Home}>Home</NavLink> },
    { key: Path.Diff, label: <NavLink to={Path.Diff}>Diff</NavLink> },
    { key: Path.Experiments, label: <NavLink to={Path.Experiments}>Experiments</NavLink> },
];

/* The nav bar stays put; each page below owns its own scroll container, so its sticky toolbar
   pins under the nav rather than to the top of the window. */
export const AppLayout = () => {
    const { pathname } = useLocation();

    return (
        <Layout style={{ height: '100%' }}>
            <Header>
                <Menu mode="horizontal" selectedKeys={[pathname]} items={NAV_ITEMS} style={{ minWidth: 0 }} />
            </Header>
            <Content style={{ flex: 1, minHeight: 0 }}>
                <Outlet />
            </Content>
        </Layout>
    );
};
