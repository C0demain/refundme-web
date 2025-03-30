import { Dialog, Button, Portal, CloseButton, Spinner, Center } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useState } from "react";

interface ReadImageProps {
  image: string;
}

const ReadImage: React.FC<ReadImageProps> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="solid" bg="#8a2be2" color="white" size="sm">
          Recibo
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header bg="#8a2be2">
              <Dialog.Title>Recibo</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body bg="white">
              {isLoading && (
                <Center py={6}>
                  <Spinner color="#8a2be2" size="lg" />
                </Center>
              )}
              <Image
                src={image}
                alt="Recibo"
                display={isLoading ? "none" : "block"}
                onLoad={() => setIsLoading(false)}
              />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ReadImage;
