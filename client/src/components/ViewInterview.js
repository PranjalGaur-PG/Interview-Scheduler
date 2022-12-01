import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useState } from "react";
import axios from "axios";

function ViewInterview() {
  const [isLoading, setIsLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    async function readData() {
      const items = await axios.get("/api/interviews");
      console.log(items.data);
      if (items.data.length) setInterviews([...items.data]);
      setIsLoading(false);
    }

    readData();
  }, []);

  return (
    <div className="p-[4rem] flex flex-col items-center">
      <div className="text-lg text-[2rem] mb-5">List of Interviews</div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {interviews.map((item, index) => (
            <ListItem item={item} key={index} />
            // <div>hello</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewInterview;
