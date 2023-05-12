import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const clickHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0 || email.length === 0) {
      alert("Cannot submit with entry fields !");
      return;
    }

    const data = { name, email };

    try {
      console.log(data);
      const res = await axios.post("/api/users", data);
      console.log(res.data);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-200">
      <div className="p-5 ml-auto mr-10">* Required fields</div>
      <h1 className="mx-16 text-5xl">Add Interview</h1>
      <div className="w-3/5 p-6 m-16 bg-white rounded-lg shadow-lg lg:w-1/3 md:w-2/5 ">
        <form className="w-50">
          <div className="mb-6 form-group">
            <label
              htmlFor="name"
              className="inline-block mb-2 text-gray-700 form-label"
            >
              Name *
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 
              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 form-group">
            <label
              htmlFor="email"
              className="inline-block mb-2 text-gray-700 form-label"
            >
              Email *
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 
              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            onClick={clickHandler}
            // type="submit"
            className="mt-8 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
