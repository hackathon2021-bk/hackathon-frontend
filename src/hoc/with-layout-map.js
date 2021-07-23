import Layout from "layout/map";

function withLayoutMap(PageContent) {
  return function Page(props) {
    return (
      <Layout>
        <PageContent {...props} />
      </Layout>
    );
  };
}

export default withLayoutMap;
