import React, { useEffect, useState } from "react";

import MatriksSoal from "../components/MatriksSoal";
import Background from "../../src/assets/bg.jpg";
import Pusher from "pusher-js";
import HeartIcon from "../../src/assets/heart-icon.svg";
import RedHeartIcon from "../../src/assets/red-heart-icon.svg";
import Health from "../components/Health";
import BrokenHeartIcon from "../assets/broken-heart.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
} from "@nextui-org/react";

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
  const [kelompok1, setKelompok1] = useState();
  const [room1, setRoom1] = useState();
  const [kelompok2, setKelompok2] = useState();
  const [room2, setRoom2] = useState();
  const [kelompok3, setKelompok3] = useState();
  const [room3, setRoom3] = useState();
  const [kelompok4, setKelompok4] = useState();
  const [room4, setRoom4] = useState();
  const [kelompok5, setKelompok5] = useState();
  const [room5, setRoom5] = useState();
  const [roundFormat, setRoundFormat] = useState([]);
  const [pass, setPass] = useState([]);
  const [passIndex, setPassIndex] = useState();
  const {
    isOpen: isOpenRound,
    onOpen: onOpenRound,
    onOpenChange: onOpenChangeRound,
  } = useDisclosure();

  const {
    isOpen: isOpenPass,
    onOpen: onOpenPass,
    onOpenChange: onOpenChangePass,
  } = useDisclosure();

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

  const roundHanlder = () => {
    const roundData = [
      { kelompok: kelompok1, room: room1 },
      { kelompok: kelompok2, room: room2 },
      { kelompok: kelompok3, room: room3 },
      { kelompok: kelompok4, room: room4 },
      { kelompok: kelompok5, room: room5 },
    ];
    setRoundFormat((prev) => [
      ...prev,
      {
        pass: pass,
        round: prev.length + 1, // Mulai dari round ke-5
        data: roundData,
      },
    ]);
    localStorage.setItem("round data", JSON.stringify(roundFormat));
  };

  const passPush = async () => {
    console.log("pushing");
    setRoundFormat((prev) => {
      // Menentukan indeks yang ingin diubah
      const index = passIndex;

      // Mengambil objek dengan indeks yang sesuai dari array prev
      const roundToUpdate = prev[index];

      // Menggabungkan objek yang sudah ada dengan data baru untuk properti "pass"
      const updatedRound = {
        ...roundToUpdate,
        pass: pass.join(", "),
      };

      // Membuat array baru dengan objek yang diperbarui
      const updatedRounds = [
        ...prev.slice(0, index), // Bagian array sebelum indeks yang ingin diubah
        updatedRound, // Objek yang diperbarui
        ...prev.slice(index + 1), // Bagian array setelah indeks yang ingin diubah
      ];

      return updatedRounds;
    });
    setPass([]);
    localStorage.setItem("round data", JSON.stringify(roundFormat));
  };

  const handlePassChange = (e) => {
    console.log(e.target.value);
    // Cek apakah e.target.value sudah ada dalam array checkede.target.values
    if (pass.includes(e.target.value)) {
      // Jika sudah ada, hapus dari array
      console.log(true);
      setPass(pass.filter((item) => item !== e.target.value));
    } else {
      // Jika belum ada, tambahkan ke array
      setPass([...pass, e.target.value]);
    }
  };

  const openPassModal = (index) => {
    console.log(index);
    onOpenPass();
    setPassIndex(index);
  };

  const showPass = () => {
    console.log(pass);
    console.log({ roundFormat });
  };

  const group = ["a", "b", "c", "d", "e"];

  const roomColor = ["primary", "secondary", "warning", "success", "danger"];

  return (
    <>
      <img src={Background} alt="" className="w-screen h-screen absolute -z-20" />
      <h1 className="text-4xl text-white font-semibold text-center py-5">MYSTERY ROOM</h1>
      <hr />
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
        <div className="gap-10 flex-wrap flex justify-center">
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

        <div className="text-white mt-10  font-semibold text-2xl">
          <div className="flex flex-col flex-wrap h-[250px] gap-3">
            {roundFormat?.map((roundData, index) => (
              <>
                <div key={index} className="">
                  <p>
                    Round {index + 1} :{" "}
                    {roundData.data.map((kelompokData, dataIndex) => (
                      <React.Fragment key={dataIndex}>
                        {kelompokData.kelompok} <span>&#8594;</span> {kelompokData.room}
                        {dataIndex !== roundData.data.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="flex gap-3 items-center text-lg">
                    <img src={BrokenHeartIcon} alt="" className="w-5 h-5" />
                    <p>: {roundData.pass}</p>
                    <button
                      onClick={() => openPassModal(index)}
                      color="primary"
                      className="w-10 bg-slate-600 text-xs"
                    >
                      pass
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="btnNext">
            <Button
              onPress={() => {
                localStorage.setItem("round data", JSON.stringify(roundFormat));
                onOpenRound();
              }}
              className="btn bg-red-500 mt-5 text-white fixed bottom-5"
            >
              next round
            </Button>
          </div>

          {/* <p>
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
          </p> */}
          {/* <RoundElement round={round} name={kelompok} number={room} /> */}
          {/* <Button onClick={() => setRound((prev) => prev + 1)} className="btn bg-primary">
            next round
          </Button> */}
        </div>
      </div>

      <Modal isOpen={isOpenPass} onOpenChange={onOpenChangePass}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className=" w-full flex gap-10">
                  {/* <Input type="text" label="Round" onChange={(e) => setRound(e.target.value)} /> */}
                  {group.map((data) => (
                    <CheckBoxPass handler={handlePassChange} value={data} />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    localStorage.setItem("round data", JSON.stringify(roundFormat));
                  }}
                >
                  Close
                </Button>
                <Button color="primary" onPress={passPush}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenRound} onOpenChange={onOpenChangeRound}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <div className=" w-full flex flex-col  md:flex-nowrap gap-4">
                  {/* <Input type="text" label="Round" onChange={(e) => setRound(e.target.value)} /> */}
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      label="Kelompok1"
                      onChange={(e) => setKelompok1(e.target.value)}
                    />
                    <Input type="text" label="Room1" onChange={(e) => setRoom1(e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      label="Kelompok2"
                      onChange={(e) => setKelompok2(e.target.value)}
                    />
                    <Input type="text" label="Room2" onChange={(e) => setRoom2(e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      label="Kelompok3"
                      onChange={(e) => setKelompok3(e.target.value)}
                    />
                    <Input type="text" label="Room3" onChange={(e) => setRoom3(e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      label="Kelompok4"
                      onChange={(e) => setKelompok4(e.target.value)}
                    />
                    <Input type="text" label="Room4" onChange={(e) => setRoom4(e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      label="Kelompok5"
                      onChange={(e) => setKelompok5(e.target.value)}
                    />
                    <Input type="text" label="Room5" onChange={(e) => setRoom5(e.target.value)} />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    localStorage.setItem("round data", JSON.stringify(roundFormat));
                  }}
                >
                  Close
                </Button>
                <Button color="primary" onPress={roundHanlder}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const CheckBoxPass = ({ handler, value }) => {
  return (
    <div className="flex gap-4">
      <Checkbox size="lg" onChange={handler} value={value.toUpperCase()} className={"uppercase"}>
        {value}
      </Checkbox>
    </div>
  );
};

function RoundElement({ round, name, number }) {
  return (
    <p>
      Round {round} : {name} <span>&#8594;</span> {number},
    </p>
  );
}

export default Operator;
