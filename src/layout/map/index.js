import { Layout } from "antd";

import Topbar from "./Topbar";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <Layout className="gx-app-layout">
      <Layout>
        <Topbar />
        <Layout.Content className="gx-layout-content gx-container-wrap">
          <div className="gx-main-content-wrapper">{children}</div>
          <Layout.Footer>
            <div className="gx-layout-footer-content">
              <Footer />
            </div>
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
