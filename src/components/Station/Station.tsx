import React, { FC, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Drone } from "../Drone/Drone";
import quadsFile from "../../assets/quads.json";

export const Station: FC<IStation> = ({ name, drones }) => {
  //State
  const [dronesList, setDronesList] = useState<IDrone[]>();
  // Drones

  /* This would normally be an api call with a catch for when the 
  API failed to show the user an error and have a state to show a 
  loading indicator for the user while the data is being fetched 
  */
  useEffect(() => {
    // You would also normally implement a try catch to signal any errors in the non API processing part of fetching dynamic data.
    const fetchDronesList = () => {
      //Get just the drones for this station by comparing the
      //large list of names with the names provided to this station as props
      const stationsDrones = quadsFile.quads.filter((drone) => {
        return drones.includes(drone.model);
      });
      setDronesList(stationsDrones);
    };
    // You would also normally implement a try catch to signal any errors in the
    // non API processing part of fetching dynamic data.
    fetchDronesList();
  }, [drones]);

  return (
    <div data-testid="station">
      <Row className="mb-3">
        <h2>{name}</h2>
        {dronesList &&
          dronesList.map((drone, i) => {
            return <Drone {...drone} key={i} />;
          })}
      </Row>
    </div>
  );
};
