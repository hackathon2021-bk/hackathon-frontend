import { Layout } from "antd";

import Topbar from "./Topbar";

function AppLayout({ children }) {
  return (
    <Layout className="gx-app-layout">
      <Layout>
        <Topbar />
        <Layout.Content className="gx-layout-content ">
          <div className="gx-main-wrapper">{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
