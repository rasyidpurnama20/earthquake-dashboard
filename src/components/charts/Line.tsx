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

const PlotFitur = (props: any) => {
  return (
    <div className="responsive-container">
      <div className="flex-container">
        <ResponsiveContainer width="100%">
          <LineChart
            data={props.data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              name={props.selectedFeature}
              type="monotone"
              dataKey="data"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PlotFitur;
