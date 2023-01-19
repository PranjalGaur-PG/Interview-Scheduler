import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewInterview from "./components/ViewInterview";
import AddInterview from "./components/AddInterview";
import EditInterview from "./components/EditInterview";
import AddUser from "./components/AddUser";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewInterview />} />
        <Route path="/addinterview" element={<AddInterview />} />
        <Route path="/edit/:id" element={<EditInterview />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
