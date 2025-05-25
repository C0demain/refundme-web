"use client";

import { Field, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { createProject } from "@/services/projectService";
import SelectUser from "../util/selectUser";

export default function CreateProjectForm({
  onChange,
}: {
  onChange?: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cc: "",
    limit: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    cc: "",
    limit: "",
    users: "",
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      title: formData.title.trim() === "" ? "Título é obrigatório." : "",
      description:
        formData.description.trim() === "" ? "Descrição é obrigatória." : "",
      cc: formData.cc.trim() === "" ? "Código CC é obrigatório." : "",
      limit:
        formData.limit.trim() === "" || isNaN(Number(formData.limit))
          ? "Limite válido é obrigatório."
          : "",
      users: selectedUsers.length === 0 ? "Selecione ao menos um usuário." : "",
    };

    setFormErrors(errors);

    // Se existir algum erro, cancela o envio
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      cc: formData.cc,
      limit: Number(formData.limit),
      users: selectedUsers,
    };

    try {
      await createProject(payload);
      onChange?.();

      // Limpa os campos
      setFormData({ title: "", description: "", cc: "", limit: "" });
      setSelectedUsers([]);
      setFormErrors({
        title: "",
        description: "",
        cc: "",
        limit: "",
        users: "",
      });
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="stretch">
        <Field.Root>
          <Field.Label>Título</Field.Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o título do projeto"
            required
          />
          <Field.HelperText>
            Este será o nome principal do projeto
          </Field.HelperText>
          <Field.ErrorText>{formErrors.title}</Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Descrição</Field.Label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descreva o projeto"
            required
          />
          <Field.ErrorText>{formErrors.description}</Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Código CC</Field.Label>
          <Input
            name="cc"
            value={formData.cc}
            onChange={handleChange}
            placeholder="Ex: CC-0001"
            required
          />
          <Field.ErrorText>{formErrors.cc}</Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Limite</Field.Label>
          <Input
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            type="number"
            placeholder="1000"
            required
          />
          <Field.ErrorText>{formErrors.limit}</Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <SelectUser onChange={setSelectedUsers} />
          <Field.ErrorText>{formErrors.users}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" bg="#7c55f3" width="full">
          Criar Projeto
        </Button>
      </VStack>
    </form>
  );
}
