import { useEffect, useState } from "react";

import MatriksSoal from "../components/MatriksSoal";
import Background from "../../src/assets/bg.jpg";
import Pusher from "pusher-js";
import HeartIcon from "../../src/assets/heart-icon.svg";
import RedHeartIcon from "../../src/assets/red-heart-icon.svg";
import { Button } from "@nextui-org/react";
import Health from "../components/Health";

//   const [clicked, setClicked] = useState(Array(9).fill(false));

//   const [boxId, setBoxId] = useState("");
//   const [matrixId, setMatrixId] = useState("");

//   useEffect(() => {
//     const pusher = new Pusher("c6c692271659e31aa5f6", {
//       cluster: "ap1",
//     });
//     const channel = pusher.subscribe("me-channel");
//     channel.bind("math-event", (data) => {
//       // console.log({ data });
//       setBoxId(data.box);
//       setMatrixId(data.kolom);
//     });
//   }, []);

//   // useEffect(() => {
//   //   const pusher = new Pusher("c6c692271659e31aa5f6", {
//   //     cluster: "ap1",
//   //   });
//   //   const channel = pusher.subscribe("me-channel");
//   //   const mathEventHandler = (data) => {
//   //     console.log(data);
//   //     setBoxId(data.box);
//   //     setMatrixId(data.kolom);
//   //   };
//   //   channel.bind("math-event", mathEventHandler);

//   //   // Membersihkan pelanggan saat komponen dibongkar
//   //   return () => {
//   //     channel.unbind("math-event", mathEventHandler);
//   //     pusher.unsubscribe("me-channel");
//   //     pusher.disconnect();
//   //   };
//   // }, []);

//   const handleClick = (index) => {
//     console.log("clicked", index, boxId);
//     if (index === boxId) {
//       // return;
//       const updatedClicked = [...clicked];
//       updatedClicked[matrixId - 1] = !updatedClicked[matrixId - 1];
//       setClicked(updatedClicked);
//       // console.log(index, id);
//       console.log({ index });
//       console.log(updatedClicked);
//       // setMatrixId(index + 1);
//       console.log(updatedClicked);
//     }
//   };

//   useEffect(() => {
//     if (boxId === id) {
//       setClicked((prevClicked) => {
//         const updatedClicked = [...prevClicked];
//         updatedClicked[matrixId - 1] = !updatedClicked[matrixId - 1];
//         return updatedClicked;
//       });
//     }
//   }, [id, boxId, matrixId, setClicked]);

//   useEffect(() => {
//     if (boxId && matrixId) {
//       console.log(boxId);
//       handleClick();
//     }
//   }, [boxId, matrixId]);

//   const roomColor = ["primary", "secondary", "warning", "success", "danger"];

//   return (
//     <>
//       <img src={Background} alt="" className="w-screen h-screen absolute -z-20" />
//       <div className="p-10 h-screen">
//         <div className="flex gap-5">
//           {roomColor.map((color, index) => (
//             <div key={index} onClick={() => console.log("ini index box", index)}>
//               <MatriksSoal
//                 color={color}
//                 id={index + 1}
//                 handleClick={() => handleClick(index)}
//                 clicked={clicked}
//                 boxId={boxId}
//                 matrixId={matrixId}
//                 // onClick={() => console.log({ index })}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Operator;

function Operator() {
  const [boxId, setBoxId] = useState("");
  const [matrixId, setMatrixId] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [health, setHealth] = useState(Array(3).fill(false));
  const [remainingHealth, setRemainingHealth] = useState(3);
  const [round, setRound] = useState(1);

  useEffect(() => {
    const pusher = new Pusher("c6c692271659e31aa5f6", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("me-channel");
    channel.bind("math-event", (data) => {
      setBoxId(data.box);
      setMatrixId(data.kolom);
      setIsPass(data.pass);
      console.log(data);
      setTrigger((prevTrigger) => !prevTrigger);
    });
  }, []);

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

  const group = ["a", "b", "c", "d", "e"];

  const roomColor = ["primary", "secondary", "warning", "success", "danger"];

  return (
    <>
      <img src={Background} alt="" className="w-screen h-screen absolute -z-20" />
      <h1 className="text-4xl text-white font-semibold text-center pt-5">MYSTERY ROOM</h1>
      <div className="flex flex-wrap gap-14 pt-10 justify-around">
        {group.map((group, index) => (
          <div key={index} className="mb-5">
            <p className="mb-5 text-white font-semibold text-xl">
              Group
              <span className="uppercase"> {group}</span>
            </p>
            <div className="flex gap-5">
              <Health />
            </div>
            {/* <Button onClick={setLastToTrue}>Pass</Button> */}
          </div>
        ))}
      </div>
      <div className="p-10 h-screen">
        <div className="flex gap-5 flex-wrap">
          {roomColor.map((color, index) => (
            <div key={index}>
              <MatriksSoal
                color={color}
                id={index + 1}
                boxId={boxId}
                matrixId={matrixId}
                trigger={trigger}
                isPass={isPass}
              />
            </div>
          ))}
        </div>

        <div className="text-white mt-10 flex flex-col flex-wrap h-[120px] gap-3 font-semibold text-2xl">
          <p>
            Round 1 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          <p>
            Round 2 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          <p>
            Round 3 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          <p>
            Round 4 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          <p>
            Round 5 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>{" "}
          <p>
            Round 6 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          <p>
            Round 7 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>{" "}
          <p>
            Round 8 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          <p>
            Round 9 : A <span>&#8594;</span> 3, B <span>&#8594;</span> 2, C <span>&#8594;</span> 1,
            D <span>&#8594;</span> 0, E <span>&#8594;</span> 4
          </p>
          {/* <Button onClick={() => setRound((prev) => prev + 1)} className="btn bg-primary">
            next round
          </Button> */}
        </div>
      </div>
    </>
  );
}

export default Operator;
