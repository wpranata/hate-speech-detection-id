import { useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const App = () => {
  const [datas, setDatas] = useState([0, 0, 0]);
  const textRef = useRef(null);

  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Percentage",
        data: datas,
        backgroundColor: [
          "rgba(127, 255, 0, 1)",
          "rgba(255, 103, 0, 1)",
          "rgba(255, 20, 147, 1)",
        ],
        borderColor: [
          "rgba(127, 255, 0, 1)",
          "rgba(255, 103, 0, 1)",
          "rgba(255, 20, 147, 1)",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    color: "white",
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
    },
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const text = textRef.current.value;
    axios
      .post("http://localhost:8000/checkText", { textToCheck: text })
      .then((response) => {
        const responseData = response.data;
        setDatas([
          responseData[0].score,
          responseData[1].score,
          responseData[2].score,
        ]);
      })
      .catch(() => {
        setDatas([0, 0, 0]);
      });
  };

  return (
    <div className="bg-gradient-to-r from-fuchsia-500 to-blue-600 h-screen">
      <div className="bg-black/25 flex flex-col items-center justify-center h-screen">
        <div className="font-bold p-10">
          <h1 className="text-center text-white text-3xl drop-shadow-2xl">
            Hate Speech Recognizer
          </h1>

          <div>
            <form className="m-4 flex" onSubmit={handleFormSubmit}>
              <input
                ref={textRef}
                className="rounded-l-full p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-96 shadow-2xl"
                placeholder="URL / Text"
              />
              <button className="bg-gradient-to-r from-orange-400 to-amber-400 px-8 rounded-r-full text-white font-bold p-4 uppercase border-white border-t-2 border-b-2 border-r-2">
                CHECK
              </button>
            </form>
          </div>
        </div>
        <div className="w-auto h-auto">
          <Bar data={data} height={400} width={600} options={options} />
        </div>
      </div>
    </div>
  );
};

export default App;
