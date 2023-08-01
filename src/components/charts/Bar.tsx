"use client";

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "@/styles/chart.css";

const CorrLabel = (props: any) => {
  return (
    <div className="responsive-container">
      <div className="flex-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={730} height={250} data={props.data} barGap={0.1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis
              domain={["auto", "auto"]}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="topTen"
              name="top ten"
              fill="#00FF00"
              strokeWidth={3}
            />
            <Bar
              dataKey="botTen"
              name="bottom ten"
              fill="#EE4B2B"
              strokeWidth={3}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default CorrLabel;
