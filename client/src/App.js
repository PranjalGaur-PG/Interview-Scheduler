import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewInterview from "./components/ViewInterview";
import AddInterview from "./components/AddInterview";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewInterview />} />
        <Route path="/addinterview" element={<AddInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
