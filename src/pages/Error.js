import Banner from "../components/Banner"

export default function Error() {
    return (
        <Banner 
                title="404 - Not found" 
                subtitle="The page you are looking for cannot be found" 
                buttonText="Back home" 
                buttonLink="/" 
            />
    )
}