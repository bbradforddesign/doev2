import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoals, goalsSelector } from "../slices/goals";
import GoalBar from "./GoalBar";

const abortController = new AbortController();

const Goals = () => {
  // Redux logic
  const dispatch = useDispatch();
  const { goals, loading, hasErrors } = useSelector(goalsSelector);

  // local state to store input before sending to db
  const [item, setItem] = useState({
    category: "",
    description: "",
    amount: 0,
    start_date: "",
    end_date: "",
  });

  // on mount, fetch goals to render
  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  /**
   * API methods (ie affect external resources, not local state). Refresh redux store to subscribe to changes in db.
   *
   */
  const apiMethods = {
    Create: async () => {
      console.log(item);
      try {
        await fetch(`http://localhost:3001/api/v1/goals`, {
          method: "post",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            category: item.category,
            description: item.description,
            amount: item.amount,
            start_date: item.start_date,
            end_date: item.end_date,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(fetchGoals());
      return () => abortController.abort();
    },
    Update: async (itemId) => {
      try {
        await fetch(`http://localhost:3001/api/v1/goals/${itemId}`, {
          method: "put",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            category: item.category,
            description: item.description,
            amount: item.amount,
            start_date: item.start_date,
            end_date: item.end_date,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(fetchGoals());
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
      dispatch(fetchGoals());
      return () => abortController.abort();
    },
  };

  /**
   * Conditional rendering. Represents current state from redux store.
   * Represent goals programatically.
   */
  const renderGoals = () => {
    if (loading) return <p>Loading Goals</p>;
    if (hasErrors) return <p>Unable to Retrieve Goals</p>;

    return (
      <div>
        {goals && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <GoalBar
              goals={goals}
              apiMethods={apiMethods}
              setItem={setItem}
              item={item}
            />
            <div>
              <h1></h1>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <section>{renderGoals()}</section>;
};

export default Goals;
