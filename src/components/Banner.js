import { Button, Col, Row } from "react-bootstrap";

export default function Banner({ title, subtitle, buttonText, buttonLink}) {

    return (

        <Row>
            <Col className="text-center p-3">
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <Button variant="dark" href={buttonLink}>{buttonText}</Button>
            </Col>
        </Row>
    )
}