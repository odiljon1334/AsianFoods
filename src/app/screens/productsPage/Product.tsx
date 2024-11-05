import React, {useEffect} from "react";
import {Box, Button, Container, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CssVarsProvider} from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setProducts} from "./slice";
import {retrieveProducts} from "./selector";
import {createSelector} from "reselect";
import {Product} from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import {ProductCollection} from "../../../lib/enums/product.enum";
import {serverApi} from "../../../lib/config";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

/** REDUX SLICE & SELECTOR */
const productsRetrieve = createSelector(retrieveProducts, (products) => ({
  products,
}));

const productsArr = [
  { productName: 'Cutlet', imagePath: '/img/cutlet.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab-fresh.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab.webp' },
  { productName: 'Lavash', imagePath: '/img/lavash.webp' },
  { productName: 'Lavash', imagePath: '/img/lavash.webp' },
  { productName: 'Cutlet', imagePath: '/img/cutlet.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab.webp' },
  { productName: 'Kebab', imagePath: '/img/kebab-fresh.webp' },
];

const restaurantImg = [
  { restImg: '/img/gurme.webp' },
  { restImg: '/img/seafood.webp' },
  { restImg: '/img/sweets.webp' },
  { restImg: '/img/doner.webp' },
];


export default function ProductComponent() {
  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetrieve);

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
      search: "",
    }).then((data) => {
      setProducts(data);
    }).catch(err => console.log("Xatolik!", err));
  }, []);
  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="main-title">
              <Box className={"title"}>Burak Restaurant</Box>
              <Stack className="single-search-form">
                <input
                    type={"search"}
                    className={"search-box"}
                    name={"singleResearch"}
                    placeholder={"Type here"}
                />
                <Button
                color={"primary"}
                variant={"contained"}
                className={"search-btn"}
                endIcon={<SearchIcon />}
                >
                  SEARCH
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
              variant={"contained"}
              color={"primary"}
              className={"order"}
              >
                NEW
              </Button>
              <Button
              variant={"contained"}
              color={"secondary"}
              className={"order"}
              >
                Price
              </Button>
              <Button
              variant={"contained"}
              color={"secondary"}
              className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className="category-main">
              <Button
              className={"order"}
              variant={"contained"}
              color={"secondary"}
              >
                OTHER
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={"secondary"}
              >
              DESSERT
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={"secondary"}
              >
                DRINK
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={"secondary"}
              >
                SALAD
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={"primary"}
              >
                DISH
              </Button>
              </Stack>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                        product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + " litre"
                        : product.productSize + " size";
                  return (
                    <Stack key={product._id} className={"product-card"}>
                      <Stack
                      className={"product-img"}
                      sx={{ backgroundImage: `url(${imagePath})`}}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button className={"shop-btn"}>
                          <img
                          src={"/icons/shopping-cart.svg"}
                          style={{display: "flex"}}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "25px"}}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                            sx={{
                              color: product.productViews === 0 ? "gray" : "white",
                            }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
            count={3}
            page={1}
            renderItem={(item) => (
              <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
              color={"secondary"}
              />
            )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container>
            <Stack className="restaurant-logo">
              <Box className={"family-brands"}>Our Family Brands</Box>
              <Stack className={"restaurant-img"}>
                <CssVarsProvider>
                  {restaurantImg.map((ele, index) => {
                    return (
                    <Card key={index} className={"card"}>
                      <img src={ele.restImg} alt="" />
                    </Card>
                    )
                  })}

                </CssVarsProvider>
              </Stack>
            </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"address-title"}>Our address</Box>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23952.76401229905!2d69.24764389999999!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4e82e558c73%3A0x70e46bbd6e634e7b!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1697133496444!5m2!1sen!2sus"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
