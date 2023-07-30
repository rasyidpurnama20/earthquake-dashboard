"use client";

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import HeatMap from "react-heatmap-grid";

const xLabels = ["Low Risk", "Normal", "Risk", "High Risk"];
const yLabels = ["Low Risk", "Normal", "Risk", "High Risk"];

const HeatMapTable = (props: any) => {
  return (
    <div>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        data={props.data}
        xLabelsLocation={"bottom"}
        xLabelWidth={800}
        yLabelWidth={80}
        height={50}
        squares={false}
        cellStyle={(value: number, min: number, max: number) => ({
          background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
          fontSize: "11px",
        })}
        cellRender={(value: any) => value}
        title={(value: any) => `${value}`}
      />
    </div>
  );
};

export default HeatMapTable;
