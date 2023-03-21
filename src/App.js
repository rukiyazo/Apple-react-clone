import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";
import SectionOne from "./Components/Main.js/SectionOne";
import SectionTwo from "./Components/Main.js/SectionTwo";
import SectionThree from "./Components/Main.js/SectionThree";
import SectionFour from "./Components/Main.js/SectionFour";
import SectionFive from "./Components/Main.js/SectionFive";
import SectionSix from "./Components/Main.js/SectionSix";
import SectionSeven from "./Components/Main.js/SectionSeven";
import Iphone from "./pages/iphonepages/Iphone";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SectionOne />
                <SectionTwo />
                <SectionThree />
                <SectionFour />
                <SectionFive />
                <SectionSix />
                <SectionSeven />
              </div>
            }
          />
          <Route path="/iphone" element={<Iphone />} />
          
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
