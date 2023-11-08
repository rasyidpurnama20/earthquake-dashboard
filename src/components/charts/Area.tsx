"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from "react";
import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "@/styles/chart.css";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import { Button } from "../ui";

const UncertaintyPlot = (props: any) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, `${props.title}.png`);
    }
  }, [getPng, props.title]);

  return (
    <div className="responsive-container flex flex-col">
      <div className="flex-container custom-margin-legend ">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={730}
            height={250}
            data={props.data}
            ref={ref}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              dataKey="index"
              angle={-45}
              textAnchor="end"
              padding="gap"
              height={90}
            />
            <YAxis
              height={60}
              domain={[0, 2]}
              tickCount={5}
              ticks={[0, 0.5, 1, 1.5, 2]}
              label={{
                value: "Momen Magnitude",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Area
              dataKey="lowerupper"
              stroke="#8884d8"
              fill="#00FFFF"
              // strokeDasharray="5 5"
            />
            <Line
              strokeWidth={2}
              dataKey="actual"
              stroke="#FF0000"
              dot={false}
            />
            <Line
              strokeWidth={2}
              dataKey="median"
              stroke="#0000FF"
              dot={false}
              // strokeDasharray="5 5"
            />
            <Line
              name="threshold (high risk)"
              strokeWidth={2}
              dataKey="threshold"
              stroke="#000000"
              dot={false}
              strokeDasharray="5 5"
            />
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="top" align="center" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={handleDownload} className="mt-4 w-max">
        {isLoading ? "Downloading..." : "Download"}
      </Button>
    </div>
  );
};
export default UncertaintyPlot;
