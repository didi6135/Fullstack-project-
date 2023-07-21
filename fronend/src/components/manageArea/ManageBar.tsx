import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'
import { useEffect, useState } from 'react'

import { Bar } from 'react-chartjs-2'
import { countFollowersPerTripService } from '../../Services/followersService'
import { getAllVacationsIDS } from '../../Services/tripService'


export const ManageBar = () => {


    const token = localStorage.getItem('Token')
    const tokenFixed = token?.replace(/["]/g, '')

    const [countFollow, setCountFollow] = useState<number[]>([])
    const [tripDestination, setTripDestination] = useState<string[]>([])

    useEffect(() => {
        const getAllTripID = async () => {
          if (tokenFixed) {
            try {
              const getAllID = await getAllVacationsIDS(tokenFixed);
              console.log(getAllID)
              const promises = getAllID.map((trip) =>
                countFollowersPerTripService(trip, tokenFixed)
              );
              const results = await Promise.all(promises);

            const updatedCountFollow = results.map((result) => result.followerCount);
            const updatedTripDestination = results.map((result) => result.destination);

            setCountFollow(updatedCountFollow);
            setTripDestination(updatedTripDestination);
            } catch (err) {
              console.log(err);
            }
          }
        };
      
        getAllTripID();
      }, []);


    ChartJS.register(
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend
    )

    const labels = tripDestination
    const data = {
        labels,
        datasets: [
            {
                label: 'Followers',
                data: countFollow
            }
        ]
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Followers each trips',
          },
    }

    return <>
        <div>
            <Bar 
                options = {options}
                data = {data}
            ></Bar>
        </div>
    </>
}