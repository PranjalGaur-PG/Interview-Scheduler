import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function ViewInterview() {
  const [isLoading, setIsLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    async function readData() {
      const items = await axios.get("/api/interviews");
      // console.log(items.data);
      if (items.data.length) setInterviews([...items.data]);
      setIsLoading(false);
    }

    readData();
  }, []);

  return (
    <div className="mt-[4rem] flex flex-col items-center ">
      <div className="text-lg text-[2rem] mb-5">List of Interviews</div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {interviews.map((item) => (
            <ListItem item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewInterview;
