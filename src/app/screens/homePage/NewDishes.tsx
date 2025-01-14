import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LiquorIcon from "@mui/icons-material/Liquor";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const newDishesRetriever = createSelector(retrieveNewDishes, newDishes => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  const history = useHistory();

  const chosenDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Our Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + " size";
                  return (
                    <Card
                      key={product._id}
                      variant="plain"
                      className={"card"}
                      onClick={() => chosenDishHandler(product._id)}
                    >
                      <CardOverflow>
                        <AspectRatio variant="plain" ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow
                        variant="plain"
                        className={"product-detail"}
                      >
                        <Typography className={"desc"}>
                          {product.productDesc}
                        </Typography>
                        <Stack className="info">
                          <Stack flexDirection={"row"} sx={{ gap: "10px" }}>
                            <Typography className={"title"}>
                              {product.productCollection === "DRINK" ? (
                                <LiquorIcon className="rest-icon" />
                              ) : (
                                <RestaurantIcon className="rest-icon" />
                              )}
                              {product.productName}
                            </Typography>
                            <Typography className={"price"}>
                              <p className="price-cnt">Price:</p>$
                              {product.productPrice}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className={"no-data"}>New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
