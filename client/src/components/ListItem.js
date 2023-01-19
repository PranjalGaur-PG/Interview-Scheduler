import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loader from "./Loader";
// import GetName from "./GetName";

const ListItem = ({ item }) => {
  const { topic, sDate, eDate, participants } = item;
  const d1 = new Date().getHours();
  const d2 = new Date().getHours();
  const [participantNames, setParticipantNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function readNames() {
  //     participants.map(async (participant) => {
  //       const name = await axios.get(`api/users/read/${participant}`);
  //       console.log(participantNames);

  //       const users = participantNames;
  //       setParticipantNames([...users, name.data]);
  //     });
  //     console.log(participantNames);
  //     setIsLoading(false);
  //   }

  //   readNames();
  // }, []);

  useEffect(() => {
    const readNames = async () => {
      Promise.all(
        participants.map(async (participant) => {
          const name = await axios.get(`api/users/read/${participant}`);
          // console.log(name.data);
          setParticipantNames((prev) => [...prev, name.data.name]);
        })
      );

      setIsLoading(false);
    };

    readNames();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center max-w-sm p-10 m-5 overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{topic}</div>

        <div className="text-base text-gray-700">Start Date</div>
        <div>{d1}</div>
        <div className="text-base text-gray-700">End Date</div>
        <div>{d2}</div>
      </div>
      <div className="items-center justify-center px-6 pt-4 pb-2">
        {participantNames.map((participant, ind) => (
          <span
            key={ind}
            className="inline-block h-10 px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {participant}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center w-10/12 h-12 rounded-3xl bg-slate-400">
        <Link className="w-20 text-center" to={`/edit/${item._id}`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ListItem;
