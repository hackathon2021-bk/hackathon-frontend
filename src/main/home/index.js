import {Col ,Row, Card, Layout} from "antd";
import Videohome from './videohome';
function HomePage() {
  return <>
  
    <body>
        <section id="mohinh" >
            <Videohome/>
        </section> 
              
        <section id="loiich">     
              <Layout>
                <img src="/loiich.png"  width="100%" left="0" ></img>
              </Layout>     
        </section>
    </body> 
  
  </>
}
export default HomePage;