// import React from "react";

// function GetName() {
//   useEffect(() => {
//     async function readNames() {
//       participants.map(async (participant) => {
//         const name = await axios.get(`api/users/${participant}`);
//         setParticipantName([...participantName, name.data.name]);
//       });
//       console.log(participantName);
//       setIsLoading(false);
//     }

//     readNames();
//   }, [participants, participantName]);

//   return (
//     <span
//       key={ind}
//       className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
//     >
//       {participant}
//     </span>
//   );
// }

// export default GetName;
