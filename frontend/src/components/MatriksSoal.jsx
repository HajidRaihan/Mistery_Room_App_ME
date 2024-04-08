import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import HeartIcon from "../../src/assets/heart-icon.svg";
import RedHeartIcon from "../../src/assets/red-heart-icon.svg";

const MatriksSoal = ({ color, id, boxId, matrixId, trigger, isPass }) => {
  const [clicked, setClicked] = useState(Array(9).fill(false));
  const [health, setHealth] = useState(Array(3).fill(false));
  const [remainingHealth, setRemainingHealth] = useState(3);

  const handleClick = (index) => {
    const updatedClicked = [...clicked];
    updatedClicked[index] = !updatedClicked[index];
    setClicked(updatedClicked);
  };

  const setLastToTrue = () => {
    setHealth((prevHealth) => {
      const newHealth = [...prevHealth]; // membuat salinan baru dari array state
      newHealth[remainingHealth - 1] = true; // Mengubah nilai terakhir menjadi true
      setRemainingHealth((prev) => prev - 1);
      return newHealth; // Mengembalikan array yang diperbarui
    });
  };

  useEffect(() => {
    if (boxId === id.toString() && isPass) {
      setLastToTrue();
    }
  }, [isPass, trigger]);

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
          className={`text-3xl font-bold text-white flex items-center justify-center w-1/3 h-1/3 transition-colors duration-500 ease-in-out ${
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
      <div className="flex gap-5">
        {health.map((isFalse, index) => (
          <div key={index}>
            {isFalse ? (
              <img src={HeartIcon} alt="" className="w-14 h-14" />
            ) : (
              <img src={RedHeartIcon} alt="" className="w-14 h-14" />
            )}
          </div>
        ))}
      </div>

      <Button onClick={setLastToTrue}></Button>
    </div>
  );
};

export default MatriksSoal;
