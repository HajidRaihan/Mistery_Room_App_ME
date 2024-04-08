import React, { useState } from "react";
import HeartIcon from "../../src/assets/heart-icon.svg";
import RedHeartIcon from "../../src/assets/red-heart-icon.svg";
import { Button, ButtonGroup } from "@nextui-org/react";

const Health = () => {
  const [health, setHealth] = useState(Array(3).fill(false));
  const [remainingHealth, setRemainingHealth] = useState(3);

  const kurangHealth = () => {
    setHealth((prevHealth) => {
      const newHealth = [...prevHealth]; // membuat salinan baru dari array state
      newHealth[remainingHealth - 1] = true; // Mengubah nilai terakhir menjadi true
      setRemainingHealth((prev) => prev - 1);
      return newHealth; // Mengembalikan array yang diperbarui
    });
  };

  const tambahHealth = () => {
    if (remainingHealth >= 3) {
      retun;
    }
    setHealth((prevHealth) => {
      const newHealth = [...prevHealth];
      newHealth[remainingHealth] = false;
      setRemainingHealth((prev) => prev + 1);
      return newHealth;
    });
  };
  return (
    <div>
      <div className="flex items-center gap-5">
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
      <div className="flex gap-5 mt-5">
        <Button size="sm" className="w-10" onPress={kurangHealth} color={"danger"}>
          -
        </Button>
        <Button size="sm" onPress={tambahHealth} color="primary">
          +
        </Button>
      </div>
    </div>
  );
};

export default Health;
