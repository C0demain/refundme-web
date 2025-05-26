import { Group, IconButton, Input } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  searchValue: string;
  setSearchFunction: Function;
  fetchFunction: Function;
}

export default function SearchBar(props: SearchBarProps) {
  const { searchValue, setSearchFunction, fetchFunction } = props;

  const handleEnterPressed = (key: string) => {
    if (key == "Enter") {
      fetchFunction();
    }
  };

  return (
    <Group attached w="full" colorPalette={"purple"}>
      <Input
        placeholder="Pesquisar por código ou título"
        value={searchValue}
        flex="1"
        bg="white"
        rounded={"full"}
        onChange={(e) => setSearchFunction(e.currentTarget.value)}
        onSubmit={() => fetchFunction()}
        onKeyDown={(e) => handleEnterPressed(e.key)}
        colorPalette={"purple"}
      />
      <IconButton
        colorPalette={"purple"}
        variant={{ base: "outline", _hover: "solid" }}
        rounded={"full"}
        onClick={() => fetchFunction()}
      >
        <LuSearch />
      </IconButton>
    </Group>
  );
}
