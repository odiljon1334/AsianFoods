import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Button,
  Container,
  NativeSelect,
  Stack,
  Typography,
} from "@mui/material";
import { AspectRatio, Badge, CardOverflow, Chip, Link } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LiquorIcon from "@mui/icons-material/Liquor";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import FormControl from "@mui/material/FormControl";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

/** REDUX SLICE & SELECTOR */
const productsRetrieve = createSelector(retrieveProducts, products => ({
  products,
}));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const restaurantImg = [
  { restImg: "/img/gurme.webp" },
  { restImg: "/img/seafood.webp" },
  { restImg: "/img/sweets.webp" },
  { restImg: "/img/doner.webp" },
];

export default function ProductComponent(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetrieve);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };
  const searchOrderHandler = (e: ChangeEvent<any>) => {
    const selectedValue = e.target.value as string;
    productSearch.page = 1;
    productSearch.order = selectedValue;
    setProductSearch({ ...productSearch });
    console.log(selectedValue); // Tanlangan qiymat
    // Bu yerda sort qilish funksiyasini chaqiring
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const handlePagination = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chosenDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="main-title">
              <Box className={"title"}>Asian Foods</Box>
              <Stack className="single-search-form">
                <input
                  type={"search"}
                  className={"search-box"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") searchProductHandler();
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
              <Box className={"right"}>
                <span>Sort By :</span>
                <div style={{ minWidth: 80 }}>
                  <FormControl
                    color="secondary"
                    fullWidth
                    sx={{ border: "none" }}
                  >
                    <NativeSelect
                      defaultValue={"createdAt"}
                      color={"primary"}
                      onChange={searchOrderHandler}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={"createdAt"}>NEW</option>
                      <option value={"productPrice"}>PRICE</option>
                      <option value={"productViews"}>VIEWS</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              </Box>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className="category-main">
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  OTHER
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  DESSERT
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  DRINK
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  SALAD
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.PIZZA
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PIZZA)
                  }
                >
                  PIZZA
                </Button>
                <Button
                  className={"order"}
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
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
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chosenDishHandler(product._id)}
                    >
                      <CssVarsProvider>
                        <Card
                          sx={{
                            width: 300,
                            boxShadow: "xl",
                          }}
                          variant="plain"
                        >
                          <CardOverflow>
                            <AspectRatio
                              variant="plain"
                              sx={{ minWidth: 200 }}
                              className={"product-img"}
                            >
                              <img src={imagePath} alt="" />
                              <Badge
                                className={"view-btn"}
                                badgeContent={product.productViews}
                                badgeInset="10%"
                                variant="plain"
                                color="danger"
                                size="sm"
                              >
                                <Typography sx={{ fontSize: "xl" }}>
                                  <RemoveRedEyeRoundedIcon
                                    sx={{
                                      color:
                                        product.productViews === 0
                                          ? "gray"
                                          : "white",
                                    }}
                                  />
                                </Typography>
                              </Badge>
                            </AspectRatio>
                          </CardOverflow>
                          <CardContent>
                            <Link
                              href="#product-card"
                              color="success"
                              className={"link-desc"}
                              textColor="text.primary"
                              overlay
                              endDecorator={<ArrowOutwardIcon />}
                              sx={{
                                fontWeight: "xl",
                              }}
                            >
                              {product.productCollection === "DRINK" ? (
                                <LiquorIcon className="rest-icon" />
                              ) : (
                                <RestaurantIcon className="rest-icon" />
                              )}
                              <div>{product.productName}</div>
                            </Link>

                            <Typography
                              className="product-desc"
                              sx={{ mt: 5, fontWeight: "sm" }}
                            >
                              <div>
                                {product.productPrice}
                                <MonetizationOnIcon />
                              </div>
                              <Chip
                                component="span"
                                size="md"
                                variant="soft"
                                color="success"
                              >
                                {sizeVolume}
                              </Chip>
                            </Typography>
                          </CardContent>
                          <button
                            className="btn-add"
                            onClick={e => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                              e.stopPropagation();
                            }}
                          >
                            Add to cart
                          </button>
                        </Card>
                      </CssVarsProvider>
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
              renderItem={item => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"primary"}
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
            <Stack className={"restaurant-img"}>
              <Box className={"family-brands"}>
                <span>You can order through apps</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit enim
                  bibendum sed et aliquet aliquet risus tempor semper.
                </p>
              </Box>
              <Stack className={"order-app"}>
                <Box className={"order-logo"}>
                  <img src="/img/fast-delivery.jpg" alt="" />
                  <img src="/img/pedari-minjok.jpg" alt="" />
                  <img src="/img/images1.jpeg" alt="" />
                </Box>
                <Box className={"order-logo2"}>
                  <img src="/img/yogiyo.jpg" alt="" />
                  <img src="/img/food.jpg" alt="" />
                  <img src="/img/cj-food.jpeg" alt="" />
                </Box>
                <Box className={"order-logo3"}>
                  <img src="/img/fastfood.png" alt="" />
                  <img src="/img/food-d2.jpeg" alt="" />
                  <img src="/img/uber.png" alt="" />
                </Box>
              </Stack>
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
