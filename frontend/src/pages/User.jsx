import { useState } from "react";

import MatriksSoal from "../components/MatriksSoal";
import Background from "../../src/assets/bg.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";
import HeartIcon from "../../src/assets/heart-icon.svg";
import RedHeartIcon from "../../src/assets/red-heart-icon.svg";

function User() {
  const { id } = useParams();
  const [clicked, setClicked] = useState(Array(9).fill(false));
  const [isPass, setIsPass] = useState(false);
  const [health, setHealth] = useState(Array(3).fill(false));
  const [remainingHealth, setRemainingHealth] = useState(3);

  const handleClick = (index) => {
    console.log("clicked", index, id);
    const updatedClicked = [...clicked];
    updatedClicked[index] = !updatedClicked[index];
    setClicked(updatedClicked);
    console.log(index, id);
    kirimData(id, index + 1);
  };

  const setLastToTrue = () => {
    setHealth((prevHealth) => {
      const newHealth = [...prevHealth]; // membuat salinan baru dari array state
      newHealth[remainingHealth - 1] = true; // Mengubah nilai terakhir menjadi true
      setRemainingHealth((prev) => prev - 1);
      return newHealth; // Mengembalikan array yang diperbarui
    });
  };

  const tambahHealth = () => {
    setHealth((prevHealth) => {
      const newHealth = [...prevHealth];
      newHealth[remainingHealth] = false;
      setRemainingHealth((prev) => prev + 1);
      return newHealth;
    });
  };

  const kirimData = async (boxId, matrixId) => {
    try {
      await axios
        .get(`http://localhost:3000/api/${boxId}/${matrixId}?pass=${false}`)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const passPush = async (boxId, pass) => {
    try {
      await axios.get(`http://localhost:3000/api/${boxId}/null?pass=${pass}`).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const passHandler = () => {
    setIsPass(true);
    passPush(id, true);
    console.log("pass clicked");
    setLastToTrue();
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
      <div className="p-10 h-screen flex justify-center items-center">
        <div className="flex gap-5">
          <div className={`flex rounded-xl w-[500px] h-[500px] flex-wrap text-white`}>
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
          </div>
          {/* <div className="flex gap-5">
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

          <Button onClick={passHandler}>Pass</Button>
          <Button onClick={tambahHealth}>tambah</Button> */}
        </div>
      </div>
    </>
  );
}

export default User;
