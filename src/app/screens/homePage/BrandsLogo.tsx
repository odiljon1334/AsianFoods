import { Box, Container, Stack } from "@mui/material";

export default function BrandsLogo() {
  return (
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
                <img src="/img/pedari-minjok.jpg" alt="" />
                <img src="/img/fast-delivery.jpg" alt="" />
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
  );
}
