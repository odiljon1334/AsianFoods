import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import "../../../css/products.css";
import ProductComponent from "./Product";
import {CartItem} from "../../../lib/types/search";


interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const {onAdd} = props;
  const products = useRouteMatch();
  
    return (
      <div className={"products-page"}>
        <Switch>
          <Route path={`${products.path}/:productId`}>
            <ChosenProduct onAdd={onAdd}/>
          </Route>
          <Route path={`${products.path}`}>
            <ProductComponent onAdd={onAdd}/>
          </Route>
        </Switch>
      </div>
    );
  }