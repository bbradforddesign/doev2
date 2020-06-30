import React from "react";

const GraphBar = (props) => {
  const spent = props.current;
  const whitespace = props.total - props.current;

  const themes = {
    expense: "#FF0000",
    income: "#00FF00",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "2vh",
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        marginBottom: "2px",
      }}
    >
      <div
        style={{
          flex: spent,
          backgroundColor:
            props.category === "Income" ? themes.income : themes.expense,
          height: "2vh",
        }}
      />
      <p style={{ flex: whitespace, marginLeft: "1vw" }}>${spent}</p>
    </div>
  );
};

export default GraphBar;