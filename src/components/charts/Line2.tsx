"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "@/styles/chart.css";

const PlotRisk = (props: any) => {
  return (
    <div className="responsive-container">
      <div className="flex-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={730}
            height={250}
            data={props.data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="index"
              label={{ value: "", angle: -90, position: "insideLeft" }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              strokeWidth={2}
              type="monotone"
              dataKey="actual"
              stroke="#FF0000"
              dot={false}
            />
            <Line
              strokeWidth={2}
              type="monotone"
              dataKey="predicted"
              stroke="#8884d8"
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PlotRisk;
