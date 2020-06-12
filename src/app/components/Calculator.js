import React, { useEffect, useState } from "react";
import Graph from "./Graph";

const Calculator = (props) => {
  // local state to store input before sending to db
  const [total, setTotal] = useState({ all: 0, categories: {} });

  const Transactions = props.transactions;
  // shorthand for the object where category totals are stored
  const AllCats = total.categories;

  // calculate totals of all categories. store in local state to render graph
  useEffect(() => {
    // grand total of all transactions
    const allReduced = Transactions.reduce((x, y) => x + y.amount, 0);
    // store all user created categories in state, and total up corresponding values
    Transactions.forEach((e) => {
      const Cat = e.category;
      const Amt = e.amount;
      setTotal(AllCats[Cat] ? (AllCats[Cat] += Amt) : (AllCats[Cat] = Amt));
    });
    setTotal({ ...total, all: allReduced });
  }, [Transactions]);

  // pass calculated values on to be rendered
  return (
    <section>
      <Graph total={total} />
    </section>
  );
};

export default Calculator;
