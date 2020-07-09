import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, Typography, Button } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Transaction = (props) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Card
      style={{
        backgroundColor: props.type === "income" ? "#0F0" : "#F00",
        margin: "5% 10%",
        flex: 1,
      }}
    >
      <ExpansionPanel
        expanded={expanded === props.id}
        onChange={handleChange(props.id)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          id={props.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{props.description}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle2" style={{ paddingBottom: "5%" }}>
            <strong>{props.category}</strong>
            <br />
            {moment(props.created).format("MM/DD/YY")}
          </Typography>
          <Typography
            variant="h6"
            style={{ paddingBottom: "10%", alignSelf: "flex-end" }}
          >
            ${props.amount}
          </Typography>
          <Link
            style={{ textDecoration: "none", alignSelf: "center" }}
            to={{
              pathname: "/transaction/edit",
              props: {
                id: props.id,
                description: props.description,
                category: props.category,
                amount: props.amount,
                type: props.type,
              },
            }}
          >
            <Button variant="outlined">EDIT</Button>
          </Link>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
};

export default Transaction;
