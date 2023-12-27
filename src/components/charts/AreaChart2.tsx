"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import dynamic from "next/dynamic";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function PlotlyComponent(props: any) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Plot
      data={[
        {
          x: props.x,
          y: props.y,
          z: props.z,
          mode: "markers",
          type: "scatter3d",
          marker: {
            size: 5,
            color: props.series,
            colorscale: "Viridis",
            opacity: 0.8,
          },
        },
      ]}
      className="h-full w-full"
    />
  );
}

export default PlotlyComponent;
