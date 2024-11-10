import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import {CartItem} from "../../../lib/types/search";

interface HomeNavbarProps {
    cartItems: CartItem[];
}


export default function HomeNavbar(props: HomeNavbarProps) {
    const {cartItems} = props;
    const authMember = null;

    return (
    <div className="home-navbar">
        <Container className="navbar-container">
            <Stack className="menu">
                <Box>
                    <NavLink to={'/'}>
                        <img className="brand-logo" src="/icons/burak.svg"  alt={'brand-logo'}/>
                    </NavLink>
                </Box>

                <Stack className="links">

                <Box className={"hover-line"}>
                    <NavLink to={'/'} activeClassName="underline">Home</NavLink>
                </Box>
                <Box className={"hover-line"}>
                    <NavLink to={'/products'} activeClassName="underline">Products</NavLink>
                </Box>
                {authMember ? (
                <Box className={"hover-line"}>
                    <NavLink to={'/orders'} activeClassName="underline">Orders</NavLink>
                </Box>
                ) : null}
                {authMember ? (
                <Box className={"hover-line"}>
                    <NavLink to={'/member-page'} activeClassName="underline">My Page</NavLink>
                </Box>
                ) : null}
                <Box className={"hover-line"}>
                    <NavLink to={'/help'} activeClassName="underline">Help</NavLink>
                </Box>
                {/* BASKET */}
                <Basket cartItems={cartItems}/>
                {!authMember ? (
                    <Box>
                        <Button className="login-button" variant="contained">Login</Button>
                    </Box>
                    ) : (
                    <img 
                    className="user-avatar"
                    src={"/icons/default-user.svg"}
                    aria-haspopup={"true"}
                    />
                    )}
                </Stack>
            </Stack>
            <Stack className={"header-frame"}>
                <Stack className={"detail"}>
                    <Box className={"head-main-text"}>
                        World's Most Delicious Cousine
                    </Box>
                    <Box className={"wel-txt"}>
                        The Choice, not just a choice
                    </Box>
                    <Box className={"service-text"}>
                        24 hours service
                    </Box>
                    <Box className={"signup"}>
                        {!authMember ? (
                            <Button 
                            variant={"contained"} 
                            className={"signup-button"}
                            >
                                SIGN UP
                            </Button>
                            ) : null}
                    </Box>
                </Stack>
                <Box className={"logo-frame"}>
                    <div className={"logo-img"}></div>
                </Box>
            </Stack>
        </Container>
    </div>
    );
}