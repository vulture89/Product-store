import { Box, Button, HStack, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useColorModeValue, useDisclosure, useToast,  } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductState } from "../store/product";
import { useState } from "react";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [ updatedProduct, setUpdateProduct ] = useState(product);

    const { deleteProduct, updateProduct } = useProductState();
    
    const toast = useToast();
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: "3000",
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: "3000",
                isClosable: true
            })
        }
    };

    const handleUpdate = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: "3000",
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: "3000",
                isClosable: true
            })
        }
        onClose();
    };
    
    return (
        <Box bg={bg} shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} fallbackSrc={useColorModeValue("https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=612x612&w=0&k=20&c=qRydgCNlE44OUSSoz5XadsH7WCkU59-l-dwrvZzhXsI=", "https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg")} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={"2"}>{product.name}</Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => {handleDeleteProduct(product._id)}} colorScheme="red" />
                </HStack>
            </Box>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input onChange={(e) => {setUpdateProduct({...updatedProduct, name:e.target.value})}} value={updatedProduct.name} placeholder="Product Name" name="name"/>
                            <Input onChange={(e) => {setUpdateProduct({...updatedProduct, price:e.target.value})}} value={updatedProduct.price} placeholder="Product Price" type="number"/>
                            <Input onChange={(e) => {setUpdateProduct({...updatedProduct, image:e.target.value})}} value={updatedProduct.image} placeholder="Product Image URL" name="image"/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={"3"} onClick={() => {handleUpdate(product._id, updatedProduct)}}>Update</Button>
                        <Button variant={"ghost"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard;