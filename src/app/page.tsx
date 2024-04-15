import Link from "next/link";
// import styles from "./page.module.css";
// import styles from './Home.module.css';
import "./home.css";

export default function Home() {
  return (
    <main 
      className="landing_page"
      style={{
        width:"100%", display:"flex", flexDirection:"column", alignItems:"center",
        gap:"70px"
      }}>
        
        <div className="landing_container">
          <nav className="nav" style={{display:"flex", justifyContent:"space-between", width:"90%", marginTop:"50px"}}>
              <h1 
                style={{fontWeight:"bold", color:"whitesmoke",
                textShadow: "2px 2px 5px rgba(0, 0, 0.5)",
                }}>E-Library</h1>

              <Link 
                className="sign_up"
                href="/book"
                style={{border:"none", paddingLeft:"20px", paddingRight:"20px", paddingTop:"10px", paddingBottom:"10px",
                fontWeight:"bold",
                cursor:"pointer",
                
              }}>SignIn</Link>
          </nav>

          <section 
            style={{
              marginTop:"80px",
              display:"flex",
              flexDirection:"column",
              alignItems:"center"
            }}
          >
              <h1 className="hero_text">School Of Nuresing</h1>
              <p
                style={{
                  color:"whitesmoke",
                  textShadow: "2px 2px 5px rgba(0, 0, 0.5)",
                  fontSize:"20px",

                }}
              >Holly Rosary Hospital Emekuku</p>
          </section>

          <section 
            className="landing_footer"
            style={{
              display:"flex",
              color:"whitesmoke",
              textShadow: "2px 2px 5px rgba(0, 0, 0.5)",
            }}
          >
              <p 
                
              >The more you know, the more you grow.</p>
              <p
              
              >
                  learn from yesterday, live for today.
              </p>
              <p 
              
              >Knowledge is power</p>
              <p 
              
              >Knowledge speaks, but wisdom listens.</p>
          </section>
        </div>

    </main>
  );
}
