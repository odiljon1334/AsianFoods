import React, {useEffect} from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisment from "./Advertisment";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";


export default function HomePage() {
    useEffect(() => {
        // Backend server data request => Data

        // Slice: Data => Store
    }, []);
    return (
      <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisment/>
        <ActiveUsers/>
        <Events/>
      </div>
    );
  }