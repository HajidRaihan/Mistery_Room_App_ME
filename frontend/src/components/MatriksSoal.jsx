import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

// const MatriksSoal = ({ color }) => {
//   return (
//     <div className={`flex rounded-xl w-[300px] h-[300px] flex-wrap text-white`}>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-tl-xl hover:opacity-80 cursor-pointer`}
//       >
//         1
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
//       >
//         2
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-tr-xl hover:opacity-80 cursor-pointer`}
//       >
//         3
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
//       >
//         4
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
//       >
//         5
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
//       >
//         6
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-bl-xl hover:opacity-80 cursor-pointer`}
//       >
//         7
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
//       >
//         8
//       </div>
//       <div
//         className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-br-xl hover:opacity-80 cursor-pointer`}
//       >
//         9
//       </div>
//     </div>
//   );
// };

const MatriksSoal = ({ color, id, boxId, matrixId, trigger }) => {
  const [clicked, setClicked] = useState(Array(9).fill(false));

  const handleClick = (index) => {
    const updatedClicked = [...clicked];
    updatedClicked[index] = !updatedClicked[index];
    setClicked(updatedClicked);
  };

  useEffect(() => {
    if (boxId === id.toString()) {
      console.log("sama", boxId);
      setClicked((prevClicked) => {
        const updatedClicked = [...prevClicked];
        updatedClicked[matrixId - 1] = !updatedClicked[matrixId - 1];
        return updatedClicked;
      });
    }
  }, [id, boxId, matrixId, trigger]);
  return (
    <div className={`flex rounded-xl w-[300px] h-[300px] flex-wrap text-white`}>
      {clicked.map((isClicked, index) => (
        <Button
          radius="none"
          key={index}
          className={`text-white flex items-center justify-center w-1/3 h-1/3 transition-colors duration-500 ease-in-out ${
            isClicked ? "bg-gray-600" : "bg-" + color
          } border-1 border-white hover:opacity-80 cursor-pointer ${
            index + 1 === 1
              ? "rounded-tl-xl"
              : index + 1 === 3
              ? "rounded-tr-xl"
              : index + 1 === 7
              ? "rounded-bl-xl"
              : index + 1 === 9
              ? "rounded-br-xl"
              : ""
          }`}
          onClick={() => handleClick(index)}
        >
          {index + 1}
        </Button>
      ))}
      {/* <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-tl-xl hover:opacity-80 cursor-pointer ${
          clicked ? "bg-gray-400" : ""
        }`}
        onClick={handleClick}
      >
        1
      </div> */}
      {/* <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
      >
        2
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-tr-xl hover:opacity-80 cursor-pointer`}
      >
        3
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
      >
        4
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
      >
        5
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
      >
        6
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-bl-xl hover:opacity-80 cursor-pointer`}
      >
        7
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white hover:opacity-80 cursor-pointer`}
      >
        8
      </div>
      <div
        className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-br-xl hover:opacity-80 cursor-pointer`}
      >
        9
      </div> */}
    </div>
  );
};

export default MatriksSoal;
