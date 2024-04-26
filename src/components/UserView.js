import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function UserView({ productsData }) {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const productArr = productsData.map(product => {

            if(product.isActive === true) {
                return (
                    <ProductCard products={product} key={product._id} />
                )
            }
            else {
                return null;
            }
        })

        setProducts(productArr);
    }, [productsData])


    return (
        <>
            <h2 className="pt-4">Products</h2>
            { products }
        </>
    )
}