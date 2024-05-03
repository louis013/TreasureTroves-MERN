import { Container } from "react-bootstrap"
import Banner from "../components/Banner"
import FeaturedProoducts from "../components/FeaturedProducts"

export default function Home() {

    return (
        <>
        <Container>
            <div className="d-flex justify-content-center">
                <img src="/logo.png" alt="error" className="pt-4" width={'500px'} height={'auto'}  />
            </div>
            <Banner
                title="TreasureTroves"
                subtitle="Discover Your Next Obsession! Step into a shopper's paradise at TreasureTroves, where the thrill of discovery meets the convenience of online shopping. From daily essentials like groceries to the latest in electronics and gadgets, our virtual shelves are stocked with an extensive array of products to fulfill your every need. Navigate through our user-friendly interface, where you can effortlessly explore a diverse range of items, and snag the best deals. With TreasureTroves, the world of online shopping is at your fingertips!"
                buttonText="Shop now!"
                buttonLink="/products"
            />
        </Container>
        <FeaturedProoducts />
            
        </>
    )
}