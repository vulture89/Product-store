import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useProductState } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

  const { fetchProducts, products } = useProductState();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Products", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
          textAlign={"center"}
          fontSize={"30"}
          fontWeight={'bold'}>
          Current Products 🚀
        </Text>

        {/* Products available */}
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} w={"full"}>
          {
            products.map((product) => {
              return <ProductCard key={product._id} product={product} />
            })
          }
        </SimpleGrid>

        {/* No Products */}
        {products.length === 0 && (
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
            No Products found 🥲 { " " }
            <Link to="/create">
              <Text as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}

      </VStack>
    </Container>

  )
}

export default HomePage