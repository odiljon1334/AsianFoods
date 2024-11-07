import React, {ChangeEvent, useEffect, useState} from "react";
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
import {Product, ProductInquiry} from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import {ProductCollection} from "../../../lib/enums/product.enum";
import {serverApi} from "../../../lib/config";
import {useHistory} from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

/** REDUX SLICE & SELECTOR */
const productsRetrieve = createSelector(retrieveProducts, (products) => ({
  products,
}));

const restaurantImg = [
  { restImg: '/img/gurme.webp' },
  { restImg: '/img/seafood.webp' },
  { restImg: '/img/sweets.webp' },
  { restImg: '/img/doner.webp' },
];

export default function ProductComponent() {
  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetrieve);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("")
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
        .getProducts(productSearch)
        .then((data) => {setProducts(data)})
        .catch(err => console.log("Xatolik!", err));
  }, [productSearch]);

  useEffect(() => {
    if(searchText === "") {
      productSearch.search = "";
      setProductSearch({...productSearch});
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({...productSearch});
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({...productSearch});
  };
  
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const handlePagination = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch});
  };

  const chosenDishHandler = (id: string ) => {
    history.push(`/products/${id}`)
  }

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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === "Enter") searchProductHandler();
                    }}
                />
                <Button
                color={"primary"}
                variant={"contained"}
                className={"search-btn"}
                onClick={searchProductHandler}
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
              color={productSearch.order === "createdAt" ? "primary" : "secondary"}
              className={"order"}
              onClick={() => searchOrderHandler("createdAt")}
              >
                NEW
              </Button>
              <Button
              variant={"contained"}
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              className={"order"}
              onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
              variant={"contained"}
              color={productSearch.order === "productViews" ? "primary" : "secondary"}
              className={"order"}
              onClick={() => searchOrderHandler("productViews")}
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
              color={
                productSearch.productCollection ===
                ProductCollection.OTHER
                    ? "primary" : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                OTHER
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={
                productSearch.productCollection ===
                ProductCollection.DESSERT
                    ? "primary" : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
              >
              DESSERT
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={
                productSearch.productCollection ===
                ProductCollection.DRINK
                    ? "primary" : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                DRINK
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={
                productSearch.productCollection ===
                ProductCollection.SALAD
                    ? "primary" : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
              >
                SALAD
              </Button>
              <Button
              className={"order"}
              variant={"contained"}
              color={
                productSearch.productCollection ===
                ProductCollection.DISH
                    ? "primary" : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.DISH)}
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
                    <Stack key={product._id}
                           className={"product-card"}
                           onClick={() => chosenDishHandler(product._id)}
                    >
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
            count={
              products.length !== 0
                ? productSearch.page + 1
                : productSearch.page
            }
            page={productSearch.page}
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
            onChange={handlePagination}
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
