import { getList } from "../services/getList";
import { useEffect, useState } from "react";

export const useList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleInitialLoad = async () => {
    setLoading(true);
    try {
      const data = await getList();
      setList(data.documents);
    } catch (error) {
      setError("Could not load Todo list. Please reload the page.");
    }

    setLoading(false);
  };

  const handleReload = async () => {
    try {
      const data = await getList();
      setList(data.documents);
    } catch (error) {
      setError("Could not reload Todo list. Please reload the page.");
    }
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return { list, reloadData: handleReload, loading, error };
};
