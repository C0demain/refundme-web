"use client"

import {
    Badge,
  Portal,
  Select,
  SelectValueChangeDetails,
  createListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

const status = createListCollection({
  items: [
    { value: "Rascunho" },
    { value: "Pendente" },
    { value: "Aprovado" },
    { value: "Recusado" },
  ],
})

const badgeColors = {
    'Aprovado': 'green',
    'Recusado': 'red',
    'Rascunho': '',
    'Pendente': 'yellow'
}

interface EditableStatusProps{
    initialValue: string,
    onSelected: ((details: {value: string}) => void) | undefined
}

export default function EditableStatus(props: EditableStatusProps){
    const {initialValue, onSelected} = props
    const [currentValue, setCurrentValue] = useState(initialValue)

    const handleChange = (details: SelectValueChangeDetails<{value: string}>) => {
        setCurrentValue(details.value[0])
        if(onSelected){
            onSelected({value: details.value[0]})
        }
    }

    return (
        <Select.Root collection={status} size="sm" width="fit" variant="subtle" value={[currentValue]} onValueChange={handleChange}>
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger bgColor="white" px='6'>
                    <Badge colorPalette={badgeColors[currentValue as keyof typeof badgeColors]} >{currentValue}</Badge>
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                <Select.Content>
                    {status.items.map((stts) => (
                    <Select.Item item={stts} key={stts.value}>
                        {stts.value}
                        <Select.ItemIndicator />
                    </Select.Item>
                    ))}
                </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
  )
}

