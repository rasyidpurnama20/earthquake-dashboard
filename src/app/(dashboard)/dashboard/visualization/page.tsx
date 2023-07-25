"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { pipelinesService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Plot from "react-plotly.js";

export default function FeatureAnalysis() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const [selectedPipeline, setSelectedPipeline] = useState<string>("");

  const { data: dataPipelines } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelines", token],
    queryFn: () =>
      pipelinesService.getPipelines({
        token: token as string,
      }),
  });

  const { data: detailPipelines } = useQuery({
    enabled: !!token && !!selectedPipeline,
    queryKey: ["getPipelines", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getPipelinesById({
        token: token as string,
        id: selectedPipeline,
      }),
  });

  console.log(detailPipelines);

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b p-6">
        <span>Visualization</span>

        <div>
          <div className="plot-title" id="3D">
            <span>3D Area Plot</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Area</SelectLabel>
                  {dataPipelines?.data?.results?.map((pipeline) => (
                    <SelectItem
                      key={pipeline.id}
                      value={pipeline.id.toString()}
                      onClick={() => {
                        setSelectedPipeline(pipeline.id.toString());
                      }}
                    >
                      {pipeline.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Area</SelectLabel>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="chart-3d">
            {/* <Plot
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
            /> */}
          </div>
          <div className="chart-legend">
            <span>Series (Color): </span> <span className="bhn">o C</span>
            <span className="bhz">o M</span>
            <span className="bhe">o B</span>
          </div>
        </div>
      </div>
    </div>
  );
}
