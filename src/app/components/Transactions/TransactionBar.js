import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const TransactionBar = React.forwardRef((props, ref) => {
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
          backgroundColor: "rgb(150,250,150)",
        }}
      >
        <h3>Transactions</h3>
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
        {props.transactions.map((e) => (
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
                <strong>
                  {e.category} - {moment(e.created).format("MM/DD/YYYY")}
                </strong>
              </Typography>
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/transaction/edit",
                  props: {
                    id: e.id,
                    description: e.description,
                    category: e.category,
                    amount: e.amount,
                    type: e.type,
                  },
                }}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="subtitle1">
                {e.description} ...... ${e.amount}
              </Typography>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <Link to="/transaction/new">
        <Button variant="contained" color="primary">
          New
        </Button>
      </Link>
    </section>
  );
});

export default TransactionBar;
