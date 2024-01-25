import React, { useEffect, useState } from "react";
import "./App.css";
// import questions from "./questions";
import Result from "./components/Result";
import QuestionBox from "./components/QuestionBox";


function App() {
  return (
    <div>
      <div className="kal">
        <h1>Kalvium</h1>
      </div>
      <QuestionBox />
    </div>
  );
}

export default App;