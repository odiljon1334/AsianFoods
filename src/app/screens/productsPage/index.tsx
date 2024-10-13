import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Product from "./Product";
import "../../../css/products.css";


export default function ProductsPage() {
  const products = useRouteMatch();
  
    return (
      <div className={"products-page"}>
        <Switch>
          <Route path={`${products.path}/:productId`}>
            <ChosenProduct />
          </Route>
          <Route path={`${products.path}`}>
            <Product />
          </Route>
        </Switch>
      </div>
    );
  }