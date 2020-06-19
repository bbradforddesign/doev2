import React from "react";

const GraphBar = (props) => {
  const remaining = props.max - props.current;
  const spent = props.current;
  const whitespace = props.max
    ? props.total - props.max
    : props.total - props.current;

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
          backgroundColor: "#DDD",
          height: "2vh",
        }}
      />
      {props.max ? (
        <>
          <div
            style={{
              flex: remaining,
              backgroundColor: "#444",
              height: "2vh",
            }}
          />
          <p
            style={{
              flex: whitespace,
              marginLeft: "1vw",
            }}
          >
            ${spent}/${props.max} Spent
          </p>
        </>
      ) : (
        <>
          <p style={{ flex: whitespace, marginLeft: "1vw" }}>${spent} Spent</p>
        </>
      )}
    </div>
  );
};

export default GraphBar;
