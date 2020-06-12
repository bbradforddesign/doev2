import React, { useState, useEffect } from "react";

const Graph = (props) => {
  const [bars, setBars] = useState([]);

  const total = props.total;

  // shorthand for the object where category totals are stored
  const AllCats = total.categories;

  /**
   * Use object prototype to generate bars for graph based on category names
   * and corresponding totals
   */
  const Categories = Object.keys(AllCats);
  const CategorySum = (e) => AllCats[e];

  /**
   * for each category in state, generate a new bar with that category's data.
   * when new bar is added, setBars is used to force rerender rather than pushing directly. necessary?
   */
  useEffect(() => {
    Categories.forEach((category) => {
      if (bars.length < Categories.length) {
        setBars([
          ...bars,
          (bars[bars.length] = (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "1px",
              }}
            >
              <div
                style={{
                  flex: CategorySum(category),
                  backgroundColor: "rgba(0,200,175, 1)",
                  height: "3vh",
                  whiteSpace: "nowrap",
                }}
                key={category}
              />
              <div
                style={{
                  flex: total.all - CategorySum(category),
                }}
              >
                <p
                  style={{
                    margin: "0 1vh 0 1vh",
                  }}
                >
                  {category}: ${CategorySum(category)}
                </p>
              </div>
            </div>
          )),
        ]);
      }
    });
  }, [Categories, total.all]);

  // arrange the bars in order by flex value to display largest to smallest
  const barValue = (e) => e.props.children[0].props.style.flex;
  bars.sort((a, b) => barValue(b) - barValue(a));

  // finally, render the graph and calculated total amount together
  return (
    <section>
      <h4>Expense Analysis</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {bars.map((bar, barKey) => (
          <React.Fragment key={barKey}>{bar}</React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Graph;
