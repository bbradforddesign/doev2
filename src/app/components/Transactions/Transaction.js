import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IconButton, Card, Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import EditIcon from "@material-ui/icons/Edit";
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
        margin: "2%",
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
          <Typography>{props.description}</Typography>
          <Typography variant="caption">
            {moment(props.created).format("MM/DD/YY")}
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">${props.amount}</Typography>
          <Typography variant="subtitle1">{props.category}</Typography>

          <Link
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
            <IconButton variant="outlined">
              <EditIcon />
            </IconButton>
          </Link>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
};

export default Transaction;
