import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import SpecialPage from './pages/SpecialPage';
import BirthdayPage from './pages/BirthdayPage';

const Portfolio = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-dark min-h-screen text-slate-200 selection:bg-accent/30 selection:text-white bg-floating-blobs overflow-hidden relative">
            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] animate-float-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] animate-float-medium delay-1000" />
            </div>
            <Portfolio />
          </div>
        }
      />
      <Route path="/special" element={<SpecialPage />} />
      <Route path="/birthday" element={<BirthdayPage />} />
    </Routes>
  );
}

export default App;
