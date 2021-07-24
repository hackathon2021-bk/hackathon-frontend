import Layout from "layout/app";


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
