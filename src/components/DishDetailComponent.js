import { React, Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Label, Row, Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className='form-group'>
                                <Col md={10}>
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Control.select model='.rating' className='form-control' name="author">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={10}>
                                    <Label htmlFor="author" md={3}>Your Name</Label>
                                    <Control.text model='.author' className='form-control' placeholder='Your Name' id="author" name="author" validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className='text-danger' model='.author' show='touched' messages={{
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={10}>
                                    <Label htmlFor='comment' md={2}>Comment</Label>
                                    <Control.textarea model='.comment' className='form-control' id='comment' name='comment' rows='6' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 10}}>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderDish({dish}) {
    if (dish != null)
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    else
        return(
            <div></div>
        );
}

function changeDateFormat(date) {
    const newDate = new Date(date);
    const dateString = newDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
    return dateString;
}

function RenderComments({comments, addComment, dishId}) {
    if(comments != null) {
        const Comments = comments.map((comment) => {
            return (
                <li key="{comment.id}">
                    <p>{comment.comment}</p>
                    
                    <p>-- {comment.author}, {changeDateFormat(comment.date)}</p>
                </li>
            );
        });

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {Comments}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    } else if(props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{ props.errMess }</h4>
                </div>
            </div>
        );
    } else if(props.dish != null) {
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

export default DishDetail;