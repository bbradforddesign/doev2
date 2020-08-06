const abortController = new AbortController();

const SERVER = process.env.REACT_APP_BACKEND_URL;

const apiMethods = {
  Create: async (category, amount, date, description) => {
    try {
      await fetch(`${SERVER}/api/v1/goals`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category: category,
          amount: amount,
          date: date,
          description: description,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
  Update: async (itemId, category, amount, date, description) => {
    try {
      await fetch(`${SERVER}/api/v1/goals/${itemId}`, {
        method: "put",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category: category,
          amount: amount,
          date: date,
          description: description,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
  Delete: async (itemId) => {
    try {
      await fetch(`${SERVER}S/api/v1/goals/${itemId}`, {
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
