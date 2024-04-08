import { useEffect, useState } from "react";

import MatriksSoal from "../components/MatriksSoal";
import Background from "../../src/assets/bg.jpg";
import Pusher from "pusher-js";

// function Operator() {
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
  const [clicked, setClicked] = useState(Array(9).fill(false));

  const [boxId, setBoxId] = useState("");
  const [matrixId, setMatrixId] = useState("");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const pusher = new Pusher("c6c692271659e31aa5f6", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("me-channel");
    channel.bind("math-event", (data) => {
      setBoxId(data.box);
      setMatrixId(data.kolom);
      console.log(data);
      setTrigger((prevTrigger) => !prevTrigger);
    });
  }, []);

  // const handleClick = (index) => {
  //   if (index + 1 === Number(boxId)) {
  //     const updatedClicked = [...clicked];
  //     updatedClicked[index] = !updatedClicked[index];
  //     setClicked(updatedClicked);
  //   }
  // };

  const roomColor = ["primary", "secondary", "warning", "success", "danger"];

  return (
    <>
      <img src={Background} alt="" className="w-screen h-screen absolute -z-20" />
      <div className="p-10 h-screen">
        <div className="flex gap-5">
          {roomColor.map((color, index) => (
            <div key={index}>
              <MatriksSoal
                color={color}
                id={index + 1}
                // handleClick={handleClick}
                // clicked={clicked[index]}
                boxId={boxId}
                matrixId={matrixId}
                trigger={trigger}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Operator;
