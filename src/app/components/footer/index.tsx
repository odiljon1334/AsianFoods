import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #0D0D0D;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "90px" }}>
          <Stack flexDirection={"column"} style={{ width: "300px" }}>
            <Box className={"footer-brand"}>
              <img width={"56px"} height={"56px"} src={"/icons/japanese.svg"} />
              <span className="footer-title">Asian Foods</span>
            </Box>
            <Box className={"foot-desc-txt"}>
              In the new era of technology we look a in the future with certainty and pride to for our company and.
            </Box>
            <Box className="sns-context">
            <div>
                <FacebookOutlinedIcon sx={{color: "white"}}/>
              </div>
              <div>
                <XIcon sx={{color: "white"}}/>
              </div>
              <div>
                <InstagramIcon sx={{color: "white", width: "24px"}}/>
              </div>
              <div>
                <GitHubIcon sx={{color: "white", width: "24px"}}/>
              </div>
            </Box>
          </Stack>
          <Stack sx={{ ml: "160px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Bo'limlar</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Downtown, Uzbekistan</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+99895 577-54-54</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>odil1334@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "115px" }}>
              <Box>
                <Box className={"foot-category-title"}>Follow Us On Instagram</Box>
                <Box
                  sx={{ mt: "20px" }}
                  className={"foot-category-img"}
                  justifyContent={"space-between"}
                >
                  <div className="foot-img">
                    <img src={"/img/yukejan.jpg"} alt="" />
                  </div>
                  <div className="foot-img">
                    <img src={"/img/kimbab.jpg"} alt="" />
                  </div>
                  <div className="foot-img">
                    <img src={"/img/kimchi.jpg"} alt="" />
                  </div>
                  <div className="foot-img">
                    <img src={"/img/kebab.webp"} alt="" />
                  </div>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid rgb(139, 139, 139)", width: "100%", opacity: "1" }}
          sx={{ mt: "30px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
        © Copyright 2023 Hashtag Developer. All Rights Reserved
        </Stack>
      </Container>
    </Footers>
  );
}
