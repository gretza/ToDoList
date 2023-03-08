import { updateTodo } from "../services/updateTodo";

export const useUpdate = ({
  id,
  title,
  description,
  completed,
  onReload,
  onError,
}) => {
  const onComplete = async () => {
    try {
      await updateTodo({ _id: id, title, description, completed: true });
      onReload();
    } catch (_) {
      onError(
        `Could not update the task by the name of "${title}". Please tru again.`
      );
    }
  };

  const onIncomplete = async () => {
    try {
      await updateTodo({ _id: id, title, description, completed: false });
      onReload();
    } catch (_) {
      onError(
        `Could not update the task by the name of "${title}". Please tru again.`
      );
    }
  };
  return { onComplete, onIncomplete };
};
