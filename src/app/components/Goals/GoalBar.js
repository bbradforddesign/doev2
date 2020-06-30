import React from "react";
import { Link } from "react-router-dom";
import Goal from "./Goal";
import { Button } from "@material-ui/core";

const GoalBar = React.forwardRef((props, ref) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "300px",
      }}
      ref={ref}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgb(150,200,250)",
        }}
      >
        <h3>Goal List</h3>
      </div>
      <ul
        style={{
          listStyle: "none",
          height: "50vh",
          width: "80%",
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
      <Link to="/goal/new">
        <Button variant="contained" color="primary">
          New Goal
        </Button>
      </Link>
    </section>
  );
});

export default GoalBar;
