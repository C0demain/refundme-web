import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"

interface ReadImageProps{
    image: string,
}

const ReadImage: React.FC<ReadImageProps> = ({image}) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="solid" bg={'#8a2be2'} color={'white'} size="sm">
                Recibo
                </Button>
            </Dialog.Trigger>
            <Portal >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content >
                    <Dialog.Header bg={'#8a2be2'}>
                        <Dialog.Title>Recibo</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body bg={'white'}>
                        <Image src={`${image}`}/>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ReadImage