import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ title, subtitle, buttonText, buttonLink}) {

    return (

        <Row>
            <Col className="text-center p-3">
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <Link className="btn btn-dark text-light" to={buttonLink}>{buttonText}</Link>
            </Col>
        </Row>
    )
}