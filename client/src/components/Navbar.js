import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-[#000000]  sm:px-10 sm:items-center text-white sm:flex-row flex flex-col items-center sm:justify-between p-5 sm:py-2">
      <div className="pb-5 text-4xl">
        <Link to="/">Interview Scheduler</Link>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center sm:space-x-5 sm:flex-row">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/addinterview">Add</Link>
        </div>
        <div>
          <Link to="/">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
