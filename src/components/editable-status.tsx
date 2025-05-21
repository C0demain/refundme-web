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
    size?: "sm" | "md" | "lg"
}

const sizes = {
    "sm": {
        px: '6'
    },
    "md": {
        px: '8'
    },
    "lg":{
        px: '10'
    }
}

export default function EditableStatus(props: EditableStatusProps){
    const {initialValue, onSelected} = props
    const size = props.size || "sm"
    const [currentValue, setCurrentValue] = useState(initialValue)

    const handleChange = (details: SelectValueChangeDetails<{value: string}>) => {
        setCurrentValue(details.value[0])
        if(onSelected){
            onSelected({value: details.value[0]})
        }
    }

    return (
        <Select.Root collection={status} size={size} width="fit" variant="subtle" value={[currentValue]} onValueChange={handleChange}>
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger bgColor="transparent" px={sizes[size].px}>
                    <Badge 
                    colorPalette={badgeColors[currentValue as keyof typeof badgeColors]}
                    fontSize={size || "sm"}
                    >
                        {currentValue}
                    </Badge>
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.Indicator/>
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

