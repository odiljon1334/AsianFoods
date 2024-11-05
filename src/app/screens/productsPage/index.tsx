import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import "../../../css/products.css";
import ProductComponent from "./Product";


export default function ProductsPage() {
  const products = useRouteMatch();
  
    return (
      <div className={"products-page"}>
        <Switch>
          <Route path={`${products.path}/:productId`}>
            <ChosenProduct />
          </Route>
          <Route path={`${products.path}`}>
            <ProductComponent />
          </Route>
        </Switch>
      </div>
    );
  }