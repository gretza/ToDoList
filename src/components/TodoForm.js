import { TextField, Typography, Button, Box } from "@mui/material";
import { postTodo } from "../services/postTodo";
import { useForm } from "react-hook-form";
import { updateTodo } from "../services/updateTodo";
import { useState } from "react";
import React from "react";
import Alert from "@mui/material/Alert";


export const TodoForm = ({ onClose, editData }) => {
  const [error, setError] = useState("Test");
  const { register, handleSubmit } = useForm({
    defaultValues: editData || {
      completed: false,
      title: "",
      description: "",
    },
  });

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">
        {editData ? "Edit Todo" : "Add Todo"}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            if (editData) {
              await updateTodo(data);
            } else {
              await postTodo(data);
            }
            onClose?.();
          } catch (error) {
            setError("Could not save Todo. Please try again.");
          }
        })}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField required {...register("title")} label="Title" fullWidth />
          <TextField
            required
            {...register("description")}
            label="Description"
            fullWidth
          />
          <Button variant="contained" type="submit">
            {editData ? "Edit Todo" : "Add Todo"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
