import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getTripsThatUserFollowService } from "../../../Services/followersService";
import { EditTripType } from "../../../types/TripType";
import { VacationCard } from "../../VacationPage/vacationCard/VacationCard";

import "./followVacation.css";

export const FollowVacation = () => {
  const selector = useAppSelector((state) => state.user.user);

  const [trips, setTrips] = useState<EditTripType[]>([]);
  const [checkUserFollow, setCheckUserFollow] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      if (selector) {
        const res = await getTripsThatUserFollowService(selector.id);
        if (res.length === 0) {
          setCheckUserFollow(false);
        } else if (res) {
          setCheckUserFollow(true);
          setTrips(res);
        }
      }
    };
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector?.id]);

  return (
    <>
      {checkUserFollow ? (
        <section className="followContainer">
          {trips.map((trip, id) => (
            <VacationCard
              key={id}
              trip={trip}
              onDeleteTrip={function (arg0: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </section>
      ) : (
        <h1>You have no trips follow</h1>
      )}
    </>
  );
};
