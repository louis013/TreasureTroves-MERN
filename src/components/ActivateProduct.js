import Swal from "sweetalert2"
import { Button } from "react-bootstrap";

export default function ActivateProduct({ product, fetchData, isActive }) {

    // Archiving product
    const archiveToggle = (productId) => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === "Product archived succcessfully") {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Product successfully disabled"
                })
                fetchData();
            }
            else {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Error in deactivating the product! Please try again."
                })
            }
        })
    }

    // Activating Product
    const activateToggle = (productId) => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === "Product activated succcessfully") {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Product successfully acitvated"
                })
                fetchData();
            }
            else {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Error in activating the product! Please try again."
                })
            }
        })
    }

    return (
        isActive
            ?
            <Button variant="secondary" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>
            :
            <Button variant="warning" size="sm" onClick={() => activateToggle(product)}>Activate</Button>
    )
}