import Layout from "layout/home";

function withLayoutApp(PageContent) {
  return function Page(props) {
    return (
      <Layout>
        <PageContent {...props} />
      </Layout>
    );
  };
}

export default withLayoutApp;
