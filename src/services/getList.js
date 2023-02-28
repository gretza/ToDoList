export const getList = () => {
  return fetch("https://codeacademy-todo.vercel.app/api/list?user=greta")
    .then((response) => response.json())
    .catch(console.error);
};
