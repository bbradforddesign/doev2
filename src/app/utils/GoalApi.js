const abortController = new AbortController();

const apiMethods = {
  Create: async (category, description, amount, start_date, end_date) => {
    try {
      await fetch(`http://localhost:3001/api/v1/goals`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category: category,
          description: description,
          amount: amount,
          start_date: start_date,
          end_date: end_date,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
  Update: async (
    itemId,
    category,
    description,
    amount,
    start_date,
    end_date
  ) => {
    try {
      await fetch(`http://localhost:3001/api/v1/goals/${itemId}`, {
        method: "put",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category: category,
          description: description,
          amount: amount,
          start_date: start_date,
          end_date: end_date,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
  Delete: async (itemId) => {
    try {
      await fetch(`http://localhost:3001/api/v1/goals/${itemId}`, {
        method: "delete",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
};

export default apiMethods;
