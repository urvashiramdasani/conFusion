import React, { Component } from "react";
import { Navbar, NavbarBrand } from 'reactstrap';


class Header extends Component {
    render() {
        return(
            <>
                <Navbar dark>
                <div className="container">
                    <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                </div>
                </Navbar>
                <div class="p-5 text-white rounded jumbotron">
                    <h1>Ristorante Con Fusion</h1>
                    <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                </div>
            </>
        );
    }
}

export default Header;