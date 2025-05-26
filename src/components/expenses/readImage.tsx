import { Dialog, Button, Portal, CloseButton, Spinner, Center, EmptyState } from "@chakra-ui/react";
import { MdHideImage } from "react-icons/md";
import { Image } from "@chakra-ui/react";
import { useState } from "react";

interface ReadImageProps {
  image: string
}

const ReadImage: React.FC<ReadImageProps> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog.Root lazyMount immediate={false}>
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
              {image !== '' ? <Image
                src={image}
                alt="Recibo"
              /> : ((!isLoading || image === '') &&
              <EmptyState.Root>
                <EmptyState.Content>
                  <EmptyState.Indicator>
                    <MdHideImage color="grey"/>
                  </EmptyState.Indicator>
                  <EmptyState.Title color="grey">Nenhuma imagem disponível</EmptyState.Title>
                </EmptyState.Content>
              </EmptyState.Root>
                )
              }
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
