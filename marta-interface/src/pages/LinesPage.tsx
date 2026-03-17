import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import TrainList from "../components/TrainList";

export default function LinesPage() {
  // initialize some currColor state
  const [currColor, setCurrColor] = useState("gold");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/stations/${currColor}`)
      .then((response) => response.json())
      .then((data) => {
        setStationData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching station data:", error);
        setIsLoading(false);
      });
  }, [currColor]);

  useEffect(() => {
    fetch(`/api/arrivals/${currColor}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
        setIsLoading(false);
      });
  }, [currColor]);

  return (
    <div>
      <p>Stations: {stationData.length}</p>
      <p>Trains: {trainData.length}</p>
      <h1>MARTA Lines</h1>
      <div className="flex justify-center gap-10 border-b border-gray-300 bg-white py-2">
        <button
          onClick={() => setCurrColor("gold")}
          className="w-44 bg-yellow-400 py-2 text-xl text-white"
        >
          Gold
        </button>

        <button
          onClick={() => setCurrColor("red")}
          className="w-44 bg-red-600 py-2 text-xl text-white"
        >
          Red
        </button>

        <button
          onClick={() => setCurrColor("blue")}
          className="w-44 bg-blue-700 py-2 text-xl text-white"
        >
          Blue
        </button>

        <button
          onClick={() => setCurrColor("green")}
          className="w-44 bg-green-700 py-2 text-xl text-white"
        >
          Green
        </button>
      </div>
      {/* <NavBar color={currColor} data={stationData} /> */}
      {/* <TrainList color={currColor} data={trainData} /> */}
    </div>
  );
}
