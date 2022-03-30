import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish () {
        if (this.props.selectedDish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
                        <CardBody>
                        <CardTitle>{this.props.selectedDish.name}</CardTitle>
                        <CardText>{this.props.selectedDish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    changeDateFormat(date) {
        const newDate = new Date(date);
        const dateString = newDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
        return dateString;
    }

    renderComments() {
        if(this.props.selectedDish != null) {
            const comments = this.props.selectedDish.comments.map((comment) => {
                return (
                    <li key="{comment.id}">
                        <p>{comment.comment}</p>
                        
                        <p>-- {comment.author}, {this.changeDateFormat(comment.date)}</p>
                    </li>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments}
                    </ul>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    render() {
        return(
            <div className='container'>
                <div className='row'>
                    {this.renderDish()}
                    {this.renderComments()}
                </div>
            </div>
        );
    }
}

export default DishDetail;