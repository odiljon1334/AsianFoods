import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import DescriptioOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import {retrievePopularDishes} from "./selector";
import {Product} from "../../../lib/types/product";
import {serverApi} from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const popularDishesRetrieve = createSelector(retrievePopularDishes,
    (popularDishes) => ({ popularDishes })
);

export default function () {
    const {popularDishes} = useSelector(popularDishesRetrieve);
    const history = useHistory();

    const chosenDishHandler = (id: string ) => {
      history.push(`/products/${id}`)
    }

  return (
    <div className={"popular-dishes-frame"}>
    <Container>
      <Stack className="popular-section">
        <Box className="category-title">Popular Menu</Box>
      <Stack className="cards-frame">
        {popularDishes.length !== 0 ? (
            popularDishes.map((ele: Product) => {
              const imagePath = `${serverApi}/${ele.productImages[0]}`
          return (
      <CssVarsProvider key={ele._id}>
        <Card 
        className={"card"}
        onClick={() => chosenDishHandler(ele._id)}
        >
      <CardCover>
        <img src={imagePath} alt=""/>
      </CardCover>
      <CardCover className={"card-cover"}/>
    <CardContent sx={{ justifyContent: 'flex-end' }}>
      <Stack 
          flexDirection={"row"}
          justifyContent={"space-between"}
          >
      <Typography 
        level="h2"
        fontSize={"lg"} 
        textColor="#fff"
        mb={1}
      >
                                                
        {ele.productName}
      </Typography>
      <Typography sx={{
        fontWeight: "md",
        color: "neutral.300",
        alignItems: "center",
        display: "flex",
      }}>
        {ele.productViews}
      <VisibilityIcon 
        sx={{ fontSize: 25, marginLeft: "5px"}}
      />
      </Typography>
      </Stack>
    </CardContent>
    <CardOverflow sx={{
      display: "flex",
      gap: 1.5,
      py: 1.5,
      px: "var(--Card-padding)",
      borderTop: "1px solid",
      height: "60px",
      }}>
    <Typography 
      startDecorator={<DescriptioOutlinedIcon/>}
      textColor="neutral.300"
    >
      {ele.productDesc}
    </Typography>
    </CardOverflow>
    </Card>
    </CssVarsProvider>
          );
      })
    ) : (
      <Box className={"no-data"}>Popular products are not available!</Box>
    )}
    </Stack>
    </Stack>
  </Container>
  </div>
    )
}