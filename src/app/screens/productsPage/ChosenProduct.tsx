import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { createSelector } from "reselect";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Product } from "../../../lib/types/product";
import { setChosenProduct, setRestaurant } from "./slice";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

/** REDUX SLICE & SELECTOR */
const chosenProductRetrieve = createSelector(
  retrieveChosenProduct,
  chosenProduct => ({
    chosenProduct,
  })
);

const restaurantRetrieve = createSelector(retrieveRestaurant, restaurant => ({
  restaurant,
}));

interface ChosenProductsProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const { cartItems, onAdd, onRemove } = props;
  const { setChosenProduct, setRestaurant } = actionDispatch(useDispatch());
  const { productId } = useParams<{ productId: string }>();
  const [slideImage, setSlideImage] = useState<string>("");
  const { chosenProduct } = useSelector(chosenProductRetrieve);
  const { restaurant } = useSelector(restaurantRetrieve);

  useEffect(() => {
    const product = new ProductService();
    const member = new MemberService();
    product
      .getProduct(productId)
      .then(data => {
        setChosenProduct(data);
      })
      .catch(err => console.log(err));

    member
      .getRestaurant()
      .then(data => setRestaurant(data))
      .catch(err => console.log(err));
  }, []);

  /** HANDLERS **/
  const changeImageHandler = (image: string) => {
    setSlideImage(image);
  };
  let quatityItem;

  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Stack className={"sub-images"}>
            {chosenProduct?.productImages.map((ele: string) => {
              const imagePath: string = `${serverApi}/${ele}`;
              return (
                <Stack onClick={() => changeImageHandler(ele)} key={ele}>
                  <img src={imagePath} alt="" />
                </Stack>
              );
            })}
          </Stack>
          <Stack className="main-image">
            <img
              src={
                slideImage
                  ? `${serverApi}/${slideImage}`
                  : `${serverApi}/${chosenProduct?.productImages[0]}`
              }
              alt=""
            />
          </Stack>
        </Stack>

        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span style={{ marginBottom: "20px" }} className={"resto-name"}>
              {restaurant?.memberPhone}
            </span>
            <Divider height="1" width="100%" bg="#E0E0E0" />
            <p className={"product-desc"}>
              {chosenProduct?.productDesc
                ? chosenProduct.productDesc
                : "No Description"}
            </p>
            <Divider height="1" width="100%" bg="#E0E0E0" />
            <Box className={"box-order"}>
              <span>{chosenProduct?.productPrice}.00 $</span>
            </Box>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <Divider height="20" width="1" bg="#E0E0E0" />
              <div className={"evaluation-box"}>
                <span>Rating</span>
                <Divider height="20" width="1" bg="#E0E0E0" />
                <div className={"product-view"}>
                  <span>{chosenProduct.productViews}</span>
                  <span>Review</span>
                </div>
              </div>
            </Box>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={e => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                <ShoppingBagOutlinedIcon />
                Add To Card
              </Button>
            </div>
            <Divider height="1" width="100%" bg="#E0E0E0" />
          </Box>
          <Stack className={"card-info"}>
            <span>Category: {chosenProduct.productCollection}</span>
            <span>Tag: Our Shop</span>
            <div>
              Share:
              <YouTubeIcon />
              <FacebookOutlinedIcon />
              <TwitterIcon />
              <InstagramIcon />
              <TelegramIcon />
            </div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
