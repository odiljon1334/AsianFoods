import React from "react";
import Container from '@mui/material/Container'
import { Box, Stack } from "@mui/material";
import Card from "@mui/joy/Card"
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveTopUsers} from "./selector";
import {serverApi} from "../../../lib/config";
import {Member} from "../../../lib/types/member";


const topUser = [
  {_id: 1, imagePaths: "/img/justin.webp", userName: "Martin", comment: '"The best restaurant"', address: "San Diego, CA"},
  {_id: 2, imagePaths: "/img/emeli.jpg", userName: "Sophire Robson", comment: '"“Simply delicious”"', address: "Los Angeles, CA"},
  {_id: 3, imagePaths: "/img/image.png", userName: "Andy Smith", comment: '"“One of a kind restaurant”"', address: "San Francisco, CA"},
]


export default function ActiveUsers() {
  return (
  <div className={"active-users-frame"}>
  <Container>
    <Stack className={"main"}>
      <Box className={"category-title"}>What Our Top Users Say</Box>
    <Stack className={"cards-frame"}>
  <CssVarsProvider>
    {topUser.length !== 0 ? (
        topUser.map((member: any) => {
          const imagePath = member.imagePaths;
    return (
      <Card key={member._id} variant="plain" className={"card"}>
          <Typography className={"member-post"}>
            {member.comment}
          </Typography>
          <p className="member-comment">
          Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.
          </p>
          <div className="divider"></div>
          <Box className={"user-img"}>
            <img src={imagePath} alt="" />
          <div style={{flexDirection: "column", marginTop: "40px",}}>
            <span>{member.userName}</span>
            <p>{member.address}</p>
          </div>
          </Box>
      </Card>
          )
        })
      ) : (
       <Box className={"no-data"}>No Active Users!</Box>
      )}
  </CssVarsProvider>
    </Stack>
    </Stack>
  </Container>
  </div>
    )
}