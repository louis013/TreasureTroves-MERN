import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct"

export default function AdminView({ productsData, fetchData }) {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const productArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><UpdateProduct product={product._id} fetchData={fetchData}/></td>
                    <td><Button variant="danger">Archive</Button></td>
                </tr>
            )
        })
        setProducts(productArr)
    }, [productsData])

    return (
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            <AddProduct fetchData={fetchData}/>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>
    )
}