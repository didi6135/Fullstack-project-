import { IconButton } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { useAppSelector } from "../../app/hooks";
import { countFollowersPerTripService } from "../../Services/followersService";
import { getAllVacationsIDS } from "../../Services/tripService";
import { DownloadButton } from "./DownloadButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import "./manageBar.css";
import { useNavigate } from "react-router-dom";

export const ManageBar = () => {
  const navigate = useNavigate();

  const selector = useAppSelector((state) => state.user.user);

  const [countFollow, setCountFollow] = useState<number[]>([]);
  const [tripDestination, setTripDestination] = useState<string[]>([]);

  const [test, setTest] = useState<any[]>([]);

  useEffect(() => {
    if (test.length === 0) {
      const getAllTripID = async () => {
        if (selector) {
          try {
            const getAllID = await getAllVacationsIDS(selector.token);
            const promises = getAllID.map((trip) =>
              countFollowersPerTripService(trip, selector.token)
            );
            const results = await Promise.all(promises);
            const filteredResults = results.filter(
              (res) => res.followerCount !== 0
            );
            console.log(filteredResults);
            setTest(filteredResults);
            setCountFollow(
              filteredResults.map((result) => result.followerCount)
            );
            setTripDestination(
              filteredResults.map((result) => result.destination)
            );
          } catch (err) {
            console.log(err);
          }
        }
      };

      getAllTripID();
    }
  }, [selector, test]);

  const handleHomePage = () => {
    navigate("/vacationPage");
  };

  ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

  const labels = tripDestination;
  const data = {
    labels,
    datasets: [
      {
        label: "Followers",
        data: countFollow,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Followers each trips",
      },
    },
  };

  return (
    <>
      <IconButton onClick={handleHomePage}>
        <ArrowBackOutlinedIcon color="primary" />
      </IconButton>
      <div className="chartManage">
        <Doughnut options={options} data={data}></Doughnut>
      </div>
      {test.length > 0 && (
        <div className="numberOfEachTrip">
          {test.map((trip, index) => (
            <div key={index} className="tripFollower">
              <div className="tripSummery">
                <h3>{trip.destination}: </h3>
                <h4>number of followers: {trip.followerCount}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
      <DownloadButton />
    </>
  );
};
