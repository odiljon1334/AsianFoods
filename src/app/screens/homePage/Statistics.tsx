import React from "react";
import { Box, Container, Stack } from "@mui/material";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className={"info"}>
        <Stack className={"static-box"}>
          <Box className="static-num">
            <img style={{width: "55px", height: "55px"}} src="/icons/delivery-truck.svg" alt="" />
          </Box>
         <div>
         <Box className="static-text">Free Shipping</Box>
         <p className="static-free">Free shipping on all your order</p>
         </div>
        </Stack>
        <Stack className={"static-box"}>
          <Box className="static-num">
            <img style={{width: "55px", height: "55px"}} src="/icons/headphones.svg" alt="" />
          </Box>
         <div>
         <Box className="static-text">Customer Support 24/7</Box>
         <p className="static-free">Instant access to Support</p>
         </div>
        </Stack>
          <Stack className={"static-box"}>
          <Box className="static-num">
            <img style={{width: "55px", height: "55px"}} src="/icons/shopping-bag.svg" alt="" />
          </Box>
         <div>
         <Box className="static-text">100% Secure Payment</Box>
         <p className="static-free">We ensure your money is save</p>
         </div>
        </Stack>
          <Stack className={"static-box"}>
          <Box className="static-num">
            <img style={{width: "55px", height: "55px"}} src="/icons/package.svg" alt="" />
          </Box>
         <div>
         <Box className="static-text">Money-Back Guarantee</Box>
         <p className="static-free">
         If you cancel the order, 3 Days Money-Back Guarantee</p>
         </div>
        </Stack>
        </Stack>
      </Container>
    </div>
  )
}