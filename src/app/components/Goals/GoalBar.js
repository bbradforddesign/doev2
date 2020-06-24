import React, { useState } from "react";
import Goal from "./Goal";
import GoalForm from "./GoalForm";

const GoalBar = (props) => {
  const [display, setDisplay] = useState(true);

  return (
    <div>
      {display ? (
        <div>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Goal List</h3>

            <ul
              style={{
                listStyle: "none",
                height: "50vh",
                width: "30vw",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              {props.goals.map((e) => (
                <li key={e.id}>
                  <Goal
                    description={e.description}
                    category={e.category}
                    amount={e.amount}
                    date={e.date}
                    id={e.id}
                  />
                </li>
              ))}
            </ul>
          </section>
          <GoalForm />
          <button onClick={() => setDisplay(false)}>Hide Bar</button>
        </div>
      ) : (
        <button onClick={() => setDisplay(true)}>Show Bar</button>
      )}
    </div>
  );
};

export default GoalBar;
