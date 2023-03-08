import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Heading } from "./components/Heading";
import { TodoCard } from "./components/TodoCard";
import { AddNewTodo } from "./components/AddNewTodo";
import { TodoForm } from "./components/TodoForm";
import { useModal } from "./hooks/useModal";
import { useList } from "./hooks/useList";
import { TodoSkeleton } from "./components/TodoSkeleton";
import { Fragment } from "react";
import { TodoModal } from "./components/TodoModal";
import { useState } from "react";

function App() {
  const { list, reloadData, loading, error: loadingError } = useList();
  const { open, onOpen, onClose } = useModal();
  const [editData, setEditData] = useState();
  const [listErrors, setListErrors] = useState([]);

  const addListError = (errorMessage) => {
    setListErrors([...listErrors, errorMessage]);
  };

  console.log(listErrors);
  
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Heading />
        <AddNewTodo onOpen={onOpen} />

        <TodoModal
          open={open}
          onClose={() => {
            onClose();
            setEditData(null);
          }}
        >
          <TodoForm
            onClose={() => {
              onClose();
              reloadData();
              setEditData(null);
            }}
            editData={editData}
          />
        </TodoModal>

        {loadingError && (
          <Box marginBottom={2}>
            <Alert severity="error">{loadingError}</Alert>
          </Box>
        )}

        {listErrors.length > 0 &&
          listErrors.map((errorMessage, i) => (
            <Box marginBottom={2} key={errorMessage + i}>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          ))}

        {loading ? (
          <Fragment>
            <TodoSkeleton />
            <TodoSkeleton />
            <TodoSkeleton />
          </Fragment>
        ) : (
          list.map((item) => (
            <TodoCard
              key={item.title}
              id={item._id}
              title={item.title}
              completed={item.completed}
              description={item.description}
              onReload={reloadData}
              onEdit={() => {
                onOpen();
                setEditData(item);
              }}
              onError={addListError}
            />
          ))
        )}
      </Container>
    </div>
  );
}

export default App;
