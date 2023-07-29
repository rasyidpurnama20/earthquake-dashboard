/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@/components/ui";
import { pipelinesService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import PlotlyComponent from "src/components/charts/AreaChart2";
import PlotFitur from "src/components/charts/Line";
import CorrLabel from "src/components/charts/Bar";
import PlotRisk from "src/components/charts/Line2";
import PlotUncertainty from "src/components/charts/Area";
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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Datepicker from "react-tailwindcss-datepicker";

const exampleData = {
  x: [0, 1, 2, 3, 4, 5],
  y: [0, 2, 4, 6, 8, 10],
  z: [0, 3, 6, 9, 12, 15],
  series: [20, 60, 60, 40, 20],
};

export default function FeatureAnalysis() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>(
    undefined
  );
  const [selectedPipeline, setSelectedPipeline] = useState<string | undefined>(
    undefined
  );
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  console.log(
    selectedDate,
    selectedFeature,
    selectedPipeline,
    selectedPlot,
    "tes"
  );

  const { data: dataPipelines } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelines", token],
    queryFn: () =>
      pipelinesService.getPipelines({
        token: token as string,
      }),
  });

  const { data: pipelineFeatures } = useQuery({
    enabled: !!token && !!selectedPipeline,
    queryKey: ["getPipelineFeatures", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getFeaturePipelines({
        id: selectedPipeline as string,
        token: token as string,
      }),
  });

  const { data: listPipelinesTarget } = useQuery({
    enabled: !!token && !!selectedPipeline,
    queryKey: ["listPipelinesTarget", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getTargetPipelines({
        token: token as string,
        id: selectedPipeline as string,
      }),
  });

  const { data: pipelineDate } = useQuery({
    enabled: !!token && !!selectedPipeline,
    queryKey: ["getPipelineDate", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getDatePipelines({
        id: selectedPipeline as string,
        token: token as string,
      }),
  });

  const { data: plotData, isLoading: plotDateIsLoading } = useQuery({
    enabled: !!token && !!selectedPipeline && !!selectedPlot && !!selectedDate,
    queryKey: [
      "getPlotData",
      token,
      selectedPipeline,
      selectedPlot,
      selectedDate,
      selectedFeature,
    ],
    queryFn: () =>
      pipelinesService.getPlot({
        id: selectedPipeline as string,
        token: token as string,
        date: selectedDate?.startDate as string,
        plot: selectedPlot as string,
        feature: selectedFeature as string,
      }),
  });

  console.log(plotData, "plot data ----------");
  console.log(selectedDate.startDate, "on change date ----------");

  // Membaca file CSV saat komponen dimuat
  // useEffect(() => {
  //   if (detailPipelines) {
  //     Papa.parse(detailPipelines?.data.features_df as string, {
  //       download: true,
  //       header: true,
  //       complete: function (results) {
  //         setData(results);
  //         console.log(results);
  //       },
  //     });
  //   }
  // }, [selectedPipeline]);

  // console.log(data?.data[selectedDate], selectedFeature, "tes");

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b p-6">
        <span>Visualization</span>
      </div>

      <div className="p-6">
        <div className="plot-title" id="3D">
          <div className="flex justify-between">
            <div className="flex gap-4">
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

              {selectedPipeline && (
                <div className="rounded-md border">
                  <Datepicker
                    startFrom={new Date(pipelineDate?.data?.data?.[0])}
                    minDate={new Date(pipelineDate?.data?.data?.[0])}
                    maxDate={
                      new Date(
                        pipelineDate?.data?.data?.[
                          pipelineDate?.data?.data?.length - 1
                        ]
                      )
                    }
                    useRange={false}
                    asSingle={true}
                    value={selectedDate as never}
                    onChange={(value) => setSelectedDate(value as never)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {selectedPipeline && (
                <Select onValueChange={setSelectedPlot} value={selectedPlot}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Plot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="area">3D Area</SelectItem>
                      <SelectItem value="corr">Correlation</SelectItem>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="risk">Risk</SelectItem>
                      <SelectItem value="uncertainty">Uncertainty</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              {selectedPlot === "feature" && (
                <Select onValueChange={setSelectedFeature}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a feature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Feature</SelectLabel>
                      <ScrollArea className="h-40">
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
                        {pipelineFeatures?.data?.data.map((field: unknown) => (
                          <SelectItem
                            key={field as never}
                            value={field as never}
                          >
                            {field as never}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        <div className="chart-3d mt-8 flex items-center justify-center rounded-md border p-4">
          {selectedPipeline && selectedDate ? (
            selectedPlot === "area" ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                {plotDateIsLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <PlotlyComponent
                    x={plotData?.data[0]?.x}
                    y={plotData?.data[0]?.y}
                    z={plotData?.data[0]?.z}
                    series={plotData?.data[0]?.series}
                  />
                )}
                <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div>
              </div>
            ) : selectedPlot === "feature" ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                {plotDateIsLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <PlotFitur data={plotData?.data}/>
                )}
                <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div>
              </div>
            ) : selectedPlot === "corr" ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                {plotDateIsLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <CorrLabel data={plotData?.data}/>
                )}
                <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div>
              </div>
            ) : selectedPlot === "risk" ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                {plotDateIsLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <PlotRisk data={plotData?.data}/>
                )}
                <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div>
              </div>
            ) : selectedPlot === "uncertainty" ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                {plotDateIsLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <PlotUncertainty data={plotData?.data}/>
                )}
                <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div>
              </div>
            ) : (
              <span className="text-sm">Select plot first!</span>
            )
          ) : (
            <span className="text-sm">Select pipeline first!</span>
          )}
        </div>

        <div>
          {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={plotData?.data?.data}
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
      </div>
    </div>
  );
}
