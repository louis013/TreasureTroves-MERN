import { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProoducts() {

    const [ previews, setPreviews] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products`)
        .then(res => res.json())
        .then(data => {

            const numbers = [];

            const featured = [];

            const generatueRandomNums = () => {
                let randomNum = Math.floor(Math.random() * data.products.length)

                if(numbers.indexOf(randomNum) === -1) {
                    numbers.push(randomNum);
                }
                else {
                    generatueRandomNums();
                }
            }
            let maxNum = data.products.length < 5 ? data.products.length : 5

            for(let i = 0; i < maxNum; i++) {
                generatueRandomNums();

                featured.push(
                    <PreviewProducts data={data.products[numbers[i]]} key={data.products[numbers[i]]._id} breakPoint={2} />
                )
            }

            setPreviews(featured);
        })
    }, [])

    return (
        <>
            <h2 className="text-center mb-5">Featured Products</h2>
            <CardGroup className="justify-content-center">
                {previews}
            </CardGroup>
        </>
    )
}