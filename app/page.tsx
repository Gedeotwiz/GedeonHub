import Nav from "./components/nav";
import Home from "./components/home";
import About from "./components/about";
import Projects from "./components/project";
import Experience from "./components/experience";


export default function LandingPage() {
  return (
   <>
   <Nav/>
   <main>
     <Home/>
     <About/>
     <Experience/>
     <Projects/>
   </main>
   </>
  );
}
