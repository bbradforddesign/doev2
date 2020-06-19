import React from "react";

const GraphBar = (props) => {
  console.log(props);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "3vh",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <div
        style={{
          flex: props.current,
          backgroundColor: "green",
          height: "3vh",
        }}
      />
      {props.max ? (
        <>
          <div
            style={{
              flex: props.max - props.current,
              backgroundColor: "red",
              height: "3vh",
            }}
          />
          <div
            style={{
              flex: props.total - props.max,
              backgroundColor: "white",
              height: "3vh",
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{
              flex: props.total - props.current,
              backgroundColor: "white",
              height: "3vh",
            }}
          />
        </>
      )}
    </div>
  );
};

export default GraphBar;
