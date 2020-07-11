import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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
        <h3>Goals {moment().format("MM/YY")}</h3>
      </div>
      <ul
        style={{
          listStyle: "none",
          height: "50vh",
          width: "100%",
          overflow: "hidden",
          overflowY: "scroll",
          padding: 0,
        }}
      >
        {props.goals.map((e) => (
          <li key={e.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                <strong>{e.category}</strong>
              </Typography>
              <Typography>${e.amount}</Typography>
              <Link
                to={{
                  pathname: "/goal/edit",
                  props: {
                    id: e.id,
                    category: e.category,
                    amount: e.amount,
                  },
                }}
                style={{
                  textDecoration: "none",
                }}
              >
                <IconButton variant="outlined">
                  <EditIcon />
                </IconButton>
              </Link>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <Link to="/goal/new">
        <Button variant="contained" color="primary">
          New
        </Button>
      </Link>
    </section>
  );
});

export default GoalBar;
