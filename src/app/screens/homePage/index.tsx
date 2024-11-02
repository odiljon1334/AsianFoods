import React, {useEffect} from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisment from "./Advertisment";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import  { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import {Product} from "../../../lib/types/product";
import popularDishes from "./PopularDishes";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetrieve = createSelector(retrievePopularDishes,
    (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
    const {setPopularDishes} = actionDispatch(useDispatch());
    const {popularDishes} = useSelector(popularDishesRetrieve);
    // Selector: Store => Data
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