import { Dialog, Button, Portal, CloseButton, Spinner, Center, EmptyState } from "@chakra-ui/react";
import { MdHideImage } from "react-icons/md";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getExpenseById } from "@/services/expenseService";

interface ReadImageProps {
  expense_id: string
}

const ReadImage: React.FC<ReadImageProps> = ({ expense_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("")

  const getImage = async () => {
    setIsLoading(true)
    try{
      const newImage = await getExpenseById(expense_id)
      setImage(newImage.image)
    }catch(e){
      console.error(e)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getImage()
  }, [expense_id])

  return (
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
  );
};

export default ReadImage;
