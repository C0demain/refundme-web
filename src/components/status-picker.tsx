import { StatusOptions, StatusType } from "@/@types/Status";
import { HStack, Text } from "@chakra-ui/react";

interface PropsType {
  selectedValue: string | undefined;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  hiddenOptions?: StatusType[];
}

export default function StatusFilterPicker(props: PropsType) {
  const { selectedValue, setSelectedValue, hiddenOptions } = props;

  return (
    <HStack>
      <Text
        onClick={() => setSelectedValue("")}
        bgColor={selectedValue === "" ? "#d6c2f1" : "#d1d5db"}
        color={selectedValue === "" ? "#6200ee" : ""}
        px="3"
        py="1"
        rounded="full"
        cursor="pointer"
        fontSize="sm"
      >
        Todos
      </Text>
      {StatusOptions.filter(
        (i) => !hiddenOptions?.includes(i as StatusType)
      ).map((opt) => (
        <Text
          bgColor={selectedValue === opt ? "#d6c2f1" : "#d1d5db"}
          color={selectedValue === opt ? "#6200ee" : ""}
          cursor="pointer"
          px="3"
          py="1"
          rounded="full"
          fontSize="sm"
          key={opt}
          onClick={() => setSelectedValue(opt)}
        >
          {opt}
        </Text>
      ))}
    </HStack>
  );
}
