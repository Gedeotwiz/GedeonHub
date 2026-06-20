import Nav from "./components/nav";
import Home from "./components/home";
import About from "./components/about";


export default function LandingPage() {
  return (
   <>
   <Nav/>
   <main>
     <Home/>
     <About/>
   </main>
   </>
  );
}
