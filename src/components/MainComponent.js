import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import React, { Component } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchDishes, fetchComments, fetchPromos, postComment } from '../redux/ActionsCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchtoProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
})

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    
    return ComponentWithRouterProp;
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        const HomePage = () => {
            return(
                <Home dish={ this.props.dishes.dishes.filter((dish) => dish.featured)[0] } 
                dishesLoading={ this.props.dishes.isLoading }
                dishesErrMess={ this.props.dishes.errMess }
                promotion={ this.props.promotions.promotions.filter((promotion) => promotion.featured)[0] }
                promosLoading={ this.props.promotions.isLoading }
                promosErrMess={ this.props.promotions.errMess }
                leader={ this.props.leaders.filter((leader) => leader.featured)[0] } />
            );
        }

        const DishWithId = () => {
            let {dishId} = useParams();
            
            return(
                <DishDetail dish={ this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0] }
                isLoading={ this.props.dishes.isLoading }
                errMess={ this.props.dishes.errMess }
                comments={ this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId, 10)) }
                postComment={ this.props.postComment } 
                commentsErrMess={ this.props.comments.errMess }
                />
            );
        }

        return(
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={ <HomePage /> } />
                    <Route path="/aboutus" element={ <About leaders={ this.props.leaders } /> } />
                    <Route exact path="/menu" element={ <Menu dishes={ this.props.dishes } /> } />
                    <Route path="/menu/:dishId" element={ <DishWithId /> } />
                    <Route exact path="/contactus" element={ <Contact resetFeedbackForm={ this.props.resetFeedbackForm } /> } />
                    <Route path="*" element={ <Navigate to="/home" replace /> } />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));
