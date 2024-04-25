import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import AdminView from "../components/AdminView";

export default function Products() {

    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);

    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_URL}/products/all` : `${process.env.REACT_APP_API_URL}/products`

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(typeof data.message !== "string") {
                setProducts(data.products);
            }
            else {
                setProducts([])
            }
        })
    }

    useEffect(() => {

        fetchData();
    }, [user])

    return (
        <AdminView productsData={products} fetchData={fetchData}/>
    )
}