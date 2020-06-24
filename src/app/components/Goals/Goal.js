import React, { useState } from "react";
import GoalForm from "./GoalForm";

const Goal = (props) => {
  const [detailView, setDetailView] = useState(false);

  // trigger detailed view
  const triggerDetail = () => {
    setDetailView(!detailView);
  };
  return (
    <div>
      {detailView ? (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(200,200,200,.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#EEE",
              width: "50vw",
              height: "30vh",
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GoalForm id={props.id} />
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "#EEE" }}>
          <h1>{props.id}</h1>
          <p>
            Description: {props.description} Category: {props.category} Amount:{" "}
            {props.amount} Date: {props.date}
          </p>
          <button
            onClick={() => {
              triggerDetail();
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Goal;
