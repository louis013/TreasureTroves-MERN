import Banner from "../components/Banner"
import FeaturedProoducts from "../components/FeaturedProducts"

export default function Home() {

    return (
        <>
            <Banner
                title="TreasureTroves"
                subtitle="Discover Your Next Obsession!"
                buttonText="Shop now!"
                buttonLink="/products"
            />

            <FeaturedProoducts />
        </>
    )
}