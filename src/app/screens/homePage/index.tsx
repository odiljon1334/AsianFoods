import React, { useEffect } from "react";
import Statistics from "./Statistics";
import NewDishes from "./NewDishes";
import Advertisment from "./Advertisment";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import BrandsLogo from "./BrandsLogo";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setNewDishes, setTopUsers } = actionDispatch(useDispatch());
  // Selector: Store => Data
  useEffect(() => {
    // Backend server data request => Data
    const product = new ProductService();
    const member = new MemberService();

    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
      })
      .then(data => {
        setNewDishes(data);
      })
      .catch(err => console.log(err));

    member
      .getTopUsers()
      .then(data => setTopUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <NewDishes />
      <BrandsLogo />
      <Advertisment />
      <ActiveUsers />
      <Events />
    </div>
  );
}
