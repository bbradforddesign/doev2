const SERVER = process.env.REACT_APP_BACKEND_URL;

const abortController = new AbortController();

const apiMethods = {
  Create: async (category, description, amount, date) => {
    try {
      await fetch(`${SERVER}/api/v1/transactions`, {
        method: "post",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category: category,
          description: description,
          amount: amount,
          date: date,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
  Update: async (itemId, category, description, amount, date) => {
    try {
      await fetch(`${SERVER}/api/v1/transactions/${itemId}`, {
        method: "put",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category: category,
          description: description,
          amount: amount,
          date: date,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  },
  Delete: async (itemId) => {
    try {
      await fetch(`${SERVER}/api/v1/transactions/${itemId}`, {
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
