import { Button, Col, Row } from "react-bootstrap";

export default function Banner({ title, subtitle, buttonText, buttonLink}) {

    return (

        <Row>
            <Col className="text-center p-5">
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <Button variant="primary" href={buttonLink}>{buttonText}</Button>
            </Col>
        </Row>
    )
}