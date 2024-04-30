import { useContext } from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function PreviewProducts(props) {

    const { user } = useContext(UserContext);

    const { breakPoint, data } = props;
    const {_id, name, description, price} = data;

    return (
        <Col xs={12} md={breakPoint}>
            <Card className="cardHighlight mx-2">
                <Card.Body>
                    <Card.Title className="text-center">{name}</Card.Title>
                    <Card.Text className="text-center">{description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">Php {price}</h5>
                    {
                        (user.isAdmin === true)
                        ?
                        <Link className="btn btn-primary d-block" to={`products/`} >Details</Link>
                        :
                        <Link className="btn btn-primary d-block" to={`products/${_id}`} >Details</Link>
                    }
                </Card.Footer>
            </Card>
        </Col>
    )
}