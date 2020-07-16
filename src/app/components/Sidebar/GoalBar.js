import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const GoalBar = React.forwardRef((props, ref) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "300px",
        padding: "3% 0",
      }}
      ref={ref}
    >
      <Typography variant="h5">Set Goals</Typography>
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
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "5%",
              }}
            >
              <Typography
                variant="caption"
                textAlign="left"
                style={{ alignSelf: "center" }}
              >
                <strong>{e.category}</strong>
              </Typography>
              <Link
                to={{
                  pathname: "/goal/edit",
                  props: {
                    id: e.id,
                    category: e.category,
                    amount: e.amount,
                    description: e.description,
                  },
                }}
                style={{
                  textDecoration: "none",
                }}
              >
                <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: "5%",
              }}
            >
              <Typography variant="subtitle1">{e.description}</Typography>
              <Typography variant="subtitle1">
                <strong>${e.amount}</strong>
              </Typography>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <Link to="/goal/new">
        <IconButton>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Link>
    </section>
  );
});

export default GoalBar;
