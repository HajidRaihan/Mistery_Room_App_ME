import { useState } from "react";

import MatriksSoal from "../components/MatriksSoal";
import Background from "../../src/assets/bg.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";

function User() {
  const { id } = useParams();
  const [boxId, setBoxId] = useState("");
  const [matrixId, setMatrixId] = useState("");
  const [clicked, setClicked] = useState(Array(9).fill(false));

  // const handleClick = (index) => {
  //   const updatedClicked = [...boxId];
  //   updatedClicked[index] = !updatedClicked[index];
  //   setBoxId(updatedClicked);
  //   setClicked(updatedClicked);
  // };
  const handleClick = (index) => {
    console.log("clicked", index, id);
    const updatedClicked = [...clicked];
    updatedClicked[index] = !updatedClicked[index];
    setClicked(updatedClicked);
    console.log(index, id);
    setMatrixId(index + 1);
    kirimData(id, index + 1);
  };

  const kirimData = async (boxId, matrixId) => {
    try {
      await axios.get(`http://localhost:3000/api/${boxId}/${matrixId}`).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const color =
    id === "1"
      ? "primary"
      : id === "2"
      ? "secondary"
      : id === "3"
      ? "warning"
      : id === "4"
      ? "success"
      : "danger";

  return (
    <>
      <img src={Background} alt="" className="w-screen h-screen absolute -z-20" />
      <div className="p-10 h-screen">
        <div className="flex gap-5">
          {/* <MatriksSoal
            color={
              id === "1"
                ? "primary"
                : id === "2"
                ? "secondary"
                : id === "3"
                ? "warning"
                : id === "4"
                ? "success"
                : "danger"
            }
            id={id}
            handleClick={handleClick}
            clicked={clicked}
          /> */}
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
              className={`flex items-center justify-center w-1/3 h-1/3 bg-${color} border-1 border-white rounded-tl-xl hover:opacity-80 cursor-pointer`}
            >
              1
            </div>
            <div
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
        </div>

        <Button onPress={kirimData}>kirim data</Button>
      </div>
    </>
  );
}

export default User;
