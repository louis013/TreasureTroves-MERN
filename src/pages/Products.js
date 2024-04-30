import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function Products() {

    const { user } = useContext(UserContext);

    const [ products, setProducts ] = useState([]);

    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products`

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
        <>
            {
                (user.isAdmin === true)
                ?
                    <AdminView productsData={products} fetchData={fetchData}/>
                :
                    <UserView productsData={products}/>
            }

        </>
        
    )
}