import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { body } from "express-validator";

function AddInterview() {
  const [sDate, setSDate] = useState(new Date());
  const [eDate, setEDate] = useState(new Date());
  const [topic, setTopic] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    // console.log(sDate, eDate, email);

    const data = {
      topic,
      sDate: sDate.toLocaleDateString(),
      eDate: eDate.toLocaleDateString(),
      participants: selectedUsers.map((user) => user.id),
    };

    try {
      console.log(data);
      await axios.post("/api/interviews", data);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function readData() {
      const items = await axios.get("/api/users");
      // console.log(items.data);
      if (items.data.length) setUsers([...items.data]);
      setIsLoading(false);
    }

    readData();
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedUsers([...selectedList]);
  };

  const onRemove = (selectedList, removedItem) => {
    let tempUsers = selectedList.filter(
      (user) => user.name !== removedItem.name
    );
    // console.log(users);

    setSelectedUsers([...tempUsers]);
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="flex flex-col items-center justify-center bg-slate-200">
      <h1 className="mx-16 mt-16 text-5xl">Add Interview</h1>
      <div className="w-3/5 p-6 m-16 bg-white rounded-lg shadow-lg lg:w-1/3 md:w-2/5 ">
        <form className="w-50">
          <div className="mb-6 form-group">
            <label
              htmlFor="topic"
              className="inline-block mb-2 text-gray-700 form-label"
            >
              Topic
            </label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 
              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="topic"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6 form-group">
            {/* <Fit />'s child does not have absolute position. You should apply `position: absolute` to it.  */}
            <label
              htmlFor="sDate"
              className="inline-block mb-2 text-gray-700 form-label"
            >
              Start Date
            </label>
            <DateTimePicker id="sDate" onChange={setSDate} value={sDate} />
          </div>

          <div className="relative flex flex-col mb-6 form-group">
            {/* <Fit />'s child does not have absolute position. You should apply `position: absolute` to it.  */}
            <label
              htmlFor="eDate"
              className="inline-block mb-2 text-gray-700 form-label"
            >
              End Date
            </label>
            <DateTimePicker
              id="eDate"
              onChange={setEDate}
              value={eDate}
              className="absolute"
            />
          </div>

          <div>
            <label
              htmlFor="participants"
              className="inline-block mb-2 text-gray-700 form-label"
            >
              Participants
            </label>
            <Multiselect
              id="participants"
              options={users} // Options to display in the dropdown
              selectedValues={selectedUsers} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <button
            onClick={clickHandler}
            // type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddInterview;
