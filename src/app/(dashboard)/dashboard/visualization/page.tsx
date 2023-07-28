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
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";

export default function FeatureAnalysis() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const [selectedPipeline, setSelectedPipeline] = useState<string | undefined>(
    undefined
  );

  const { data: dataPipelines } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelines", token],
    queryFn: () =>
      pipelinesService.getPipelines({
        token: token as string,
      }),
  });

  const { data: detailPipelines, isFetched } = useQuery({
    enabled: !!token,
    queryKey: ["detailPipelines", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getPipelinesById({
        token: token as string,
        id: selectedPipeline as string,
      }),
  });

  const { data: listPipelinesTarget } = useQuery({
    enabled: !!token,
    queryKey: ["listPipelinesTarget", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getTargetPipelines({
        token: token as string,
        id: selectedPipeline as string,
      }),
  });

  console.log(listPipelinesTarget?.data.results);

  const [data, setData] = useState();

  // Membaca file CSV saat komponen dimuat
  useEffect(() => {
    if (detailPipelines) {
      Papa.parse(detailPipelines?.data.features_df as string, {
        download: true,
        header: true,
        complete: function (results) {
          setData(results);
          console.log(results);
        },
      });
    }
  }, [selectedPipeline]);

  const [selectedFeature, setSelectedFeature] = useState<string | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  console.log(data?.data[selectedDate], selectedFeature, "tes");

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b p-6">
        <span>Visualization</span>
      </div>

      <div className="p-6">
        <div className="plot-title" id="3D">
          <div className="mb-2">
            <span className="font-bold">3D Area Plot</span>
          </div>

          <div className="flex justify-between">
            <Select
              onValueChange={setSelectedPipeline}
              value={selectedPipeline}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Pipeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pipeline</SelectLabel>
                  {dataPipelines?.data?.results?.map((pipeline) => (
                    <SelectItem
                      key={pipeline.id}
                      value={pipeline.id.toString()}
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

        <div>
          <div>
            <Select onValueChange={setSelectedFeature}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a feature" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Feature</SelectLabel>
                  {data?.meta.fields?.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                  <SelectItem value="A">A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedDate}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Date</SelectLabel>
                  {data?.data?.map((field, index) => (
                    <SelectItem
                      key={field.index}
                      value={index}
                      onClick={() => console.log(field)}
                    >
                      {field.index}
                    </SelectItem>
                  ))}
                  <SelectItem value="A">A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={props.data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="data"
                stroke="#8884d8"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer> */}
        </div>

        <div className="chart-legend">
          <span>Series (Color): </span> <span className="bhn">o C</span>
          <span className="bhz">o M</span>
          <span className="bhe">o B</span>
        </div>
      </div>
    </div>
  );
}
