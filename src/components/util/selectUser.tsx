"use client";

import { getAllUsers, GetUsersResponse } from "@/services/userService";
import { createListCollection, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
interface SelectUserProps {
  onChange: (selectedUserIds: string[]) => void;
}

export default function SelectUser({ onChange }: SelectUserProps) {
  const [collection, setCollection] = useState<any>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users: GetUsersResponse = await getAllUsers();
        console.log(users, "Usuários do banco");

        const items = users.data.map((user) => ({
          label: user.name,
          value: user._id,
        }));

        console.log("Itens convertidos:", items);

        const list = createListCollection({
          items,
          itemToString: (item) => item.label,
        });

        setCollection(list);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues]);

  if (!collection) return null;

  return (
    <Select.Root
      multiple
      collection={collection}
      name="users"
      value={selectedValues}
      onValueChange={(details) => {
        setSelectedValues(details.value as string[]);
      }}
    >
      <Select.HiddenSelect />
      <Select.Label>Usuários</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Selecione usuários" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item: any) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
