import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import AddProduct from "./AddProduct";
import ActivateProduct from "./ActivateProduct";
import UpdateProduct from "./UpdateProduct"

export default function AdminView({ productsData, fetchData }) {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const productArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>&#8369;{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><UpdateProduct product={product._id} fetchData={fetchData}/></td>
                    <td><ActivateProduct product={product._id} fetchData={fetchData} isActive={product.isActive} /></td>
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
                        <th className="bg-dark text-light">Name</th>
                        <th className="bg-dark text-light">Description</th>
                        <th className="bg-dark text-light">Price</th>
                        <th className="bg-dark text-light">Availability</th>
                        <th colSpan="2" className="bg-dark text-light">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>
    )
}