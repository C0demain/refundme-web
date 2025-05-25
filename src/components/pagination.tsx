import {
  Center,
  Stack,
  Pagination,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  count: number;
  pageSize: number;
  page: number;
  setPage: Function;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function PaginationComponent(props: PaginationProps) {
  const { count, pageSize, page, setPage, size } = props;

  return (
    <Center>
      <Stack gap="8" m={5}>
        <Pagination.Root
          count={count}
          pageSize={pageSize}
          defaultPage={page ? page : 1}
          onPageChange={(details) => setPage(details.page)}
        >
          <ButtonGroup variant="ghost" size={size ? size : "lg"}>
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  variant={{ base: "ghost", _selected: "solid" }}
                  bg={{ _selected: "#7C55F3" }}
                  rounded={"full"}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
    </Center>
  );
}
