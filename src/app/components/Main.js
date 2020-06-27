import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  transactionsSelector,
} from "../slices/transactions";
import { setActive, sidebarSelector } from "../slices/sidebar";
import { fetchGoals, goalsSelector } from "../slices/goals";
import { logoutUser, authSelector } from "../slices/auth";
import Calculator from "./Analysis/Calculator";
import TransactionBar from "./Transactions/TransactionBar";
import GoalBar from "./Goals/GoalBar";

const Main = () => {
  // Redux
  const dispatch = useDispatch();
  const {
    transactions,
    loadingTransactions,
    hasErrorsTransactions,
  } = useSelector(transactionsSelector);
  const active = useSelector(sidebarSelector);
  const { goals, loading, hasErrors } = useSelector(goalsSelector);
  const auth = useSelector(authSelector);

  // on mount, fetch transactions to render
  useEffect(() => {
    try {
      dispatch(fetchTransactions());
      dispatch(fetchGoals());
    } catch {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  // sidebar display logic
  const renderSide = (sidebar) => {
    if (sidebar.active === "transactions") {
      return <TransactionBar transactions={transactions} />;
    }
    if (sidebar.active === "goals") {
      return <GoalBar goals={goals} />;
    }
  };

  /**
   * Conditional rendering. Represents current state from redux store.
   * Represent transactions programatically since they're constantly changing.
   */
  const renderTransactions = () => {
    if (loadingTransactions) return <p>Loading Transactions</p>;
    if (hasErrorsTransactions) return <p>Unable to Retrieve Transactions</p>;
    if (loading) return <p>Loading Goals</p>;
    if (hasErrors) return <p>Unable to Retrieve Goals</p>;

    return (
      <>
        {transactions && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "90vw",
              height: "80vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "5vw",
              }}
            >
              {renderSide(active)}

              <div
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  height: "70vh",
                  paddingTop: "5vh",
                }}
              >
                <button
                  style={{
                    margin: "5% 0",
                    height: "15%",
                    borderRadius: "0 50% 50% 0",
                    border: "none",
                    backgroundColor: "rgb(150,250,150)",
                  }}
                  onClick={
                    active.active === "transactions"
                      ? () => dispatch(setActive(""))
                      : () => dispatch(setActive("transactions"))
                  }
                >
                  Transaction
                </button>
                <button
                  style={{
                    margin: "5% 0",
                    height: "15%",
                    borderRadius: "0 50% 50% 0",
                    border: "none",
                    backgroundColor: "rgb(150,200,250)",
                  }}
                  onClick={
                    active.active === "goals"
                      ? () => {
                          dispatch(setActive(""));
                        }
                      : () => {
                          dispatch(setActive("goals"));
                        }
                  }
                >
                  Goal
                </button>
              </div>
            </div>
            <Calculator transactions={transactions} goals={goals} />
          </div>
        )}
      </>
    );
  };

  return <div>{auth.loggedIn && renderTransactions()}</div>;
};

export default Main;
