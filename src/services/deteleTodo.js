export const deleteTodo = (id) => {
 return fetch("https://codeacademy-todo.vercel.app/api/todo?user=greta", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
    }),
  }).then((response) => response.json());
};
