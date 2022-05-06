import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        };
    }

    render() {
        const HomePage = () => {
            return(
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
                promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
            );
        }

        const DishWithId = () => {
            let {dishId} = useParams();
            
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))} />
            );
        }

        return(
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route path="/aboutus" element={<About leaders={this.state.leaders} />} />
                    <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" element={<DishWithId />} />
                    <Route exact path="/contactus" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
