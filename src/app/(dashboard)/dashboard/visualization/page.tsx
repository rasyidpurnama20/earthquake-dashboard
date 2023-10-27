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
import PlotlyComponent from "@/components/charts/AreaChart2";
import PlotFitur from "@/components/charts/Line";
import CorrLabel from "@/components/charts/Bar";
import PlotRisk from "@/components/charts/Line2";
import PlotUncertainty from "@/components/charts/Area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Datepicker from "react-tailwindcss-datepicker";
import { formatDate } from "@/utils";
import { Pipeline } from "@/lib/dto";

export default function FeatureAnalysis() {
  const { data: sessionData } = useSession();
  const token = sessionData?.user?.accessToken;
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>(
    "uncertainty",
  );
  const [selectedPipeline, setSelectedPipeline] = useState<string | undefined>(
    undefined,
  );
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>(
    "",
  );
  const [selectedDate, setSelectedDate] = useState<{
    startDate: string | undefined | Date;
    endDate: string | undefined | Date;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const { data: dataPipelines, isLoading: dataPipelinesIsLoading } = useQuery({
    enabled: !!token,
    queryKey: ["getPipelines", token],
    queryFn: () =>
      pipelinesService.getPipelines({
        token: token as string,
      }),
  });

  const { data: pipelineFeatures, isLoading: pipelineFeaturesIsLoading } =
    useQuery({
      enabled: !!token && !!selectedPipeline,
      queryKey: ["getPipelineFeatures", token, selectedPipeline],
      queryFn: () =>
        pipelinesService.getFeaturePipelines({
          id: selectedPipeline as string,
          token: token as string,
        }),
    });

  const { data: pipelineDate, isLoading: pipelineDateIsLoading } = useQuery({
    enabled: !!token && !!selectedPipeline,
    queryKey: ["getPipelineDate", token, selectedPipeline],
    queryFn: () =>
      pipelinesService.getDatePipelines({
        id: selectedPipeline as string,
        token: token as string,
      }),
  });

  useEffect(() => {
    setSelectedFeature(pipelineFeatures?.data?.data[0]);
  }, [pipelineFeatures]);

  useEffect(() => {
    setSelectedDate({
      startDate:
        pipelineDate?.data?.data?.[pipelineDate?.data?.data?.length - 1],
      endDate: pipelineDate?.data?.data?.[pipelineDate?.data?.data?.length - 1],
    });
  }, [pipelineDate]);

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

  const { data: dataPipelineTargets, isLoading: dataPipelineTargetIsLoading } =
    useQuery({
      enabled: !!token && !!selectedPipeline,
      queryKey: ["getPipelineTargets", token, selectedPipeline],
      queryFn: () =>
        pipelinesService.getTargetPipelines({
          token: token as string,
          id: selectedPipeline as string,
        }),
    });

  const filterSelectedPipeline = () => {
    const data = dataPipelines?.data?.results?.filter(
      (pipeline: Pipeline) => pipeline.id === Number(selectedPipeline),
    );
    return data?.[0] as Pipeline;
  };

  const isLoading =
    dataPipelinesIsLoading ||
    pipelineFeaturesIsLoading ||
    pipelineDateIsLoading ||
    plotDateIsLoading ||
    dataPipelineTargetIsLoading;

  if (typeof window === "undefined") return null;

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b p-6">
        <span>Visualization</span>
      </div>

      <div className="p-6">
        <div className="plot-title" id="3D">
          <div className="flex justify-between">
            <div className="flex gap-4">
              {!dataPipelinesIsLoading ? (
                <Select
                  onValueChange={setSelectedPipeline}
                  value={selectedPipeline}
                >
                  <SelectTrigger className="w-max gap-1 truncate">
                    <SelectValue
                      placeholder="Select Pipeline"
                      className="truncate"
                    />
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
              ) : (
                <Skeleton className="h-10 w-24" />
              )}

              {selectedPipeline && selectedPlot !== "corr" ? (
                !isLoading ? (
                  selectedPlot === "risk" || selectedPlot === "uncertainty" ? (
                    <Select
                      onValueChange={(value) =>
                        setSelectedDate({
                          startDate: value,
                          endDate: value,
                        })
                      }
                      value={selectedDate?.startDate as string}
                    >
                      <SelectTrigger className="w-[180px] flex-nowrap overflow-hidden text-ellipsis">
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Date</SelectLabel>
                          {dataPipelineTargets?.data.results?.map((field) => (
                            <SelectItem
                              key={field.id}
                              value={
                                (field.date as string).split("+")[0] as string
                              }
                            >
                              {formatDate(field.date)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="rounded-md border">
                      <Datepicker
                        startFrom={new Date(pipelineDate?.data?.data?.[0])}
                        minDate={new Date(pipelineDate?.data?.data?.[0])}
                        maxDate={
                          new Date(
                            pipelineDate?.data?.data?.[
                              pipelineDate?.data?.data?.length - 1
                            ],
                          )
                        }
                        useRange={false}
                        asSingle={true}
                        value={selectedDate as never}
                        onChange={(value) => setSelectedDate(value as never)}
                      />
                    </div>
                  )
                ) : (
                  <Skeleton className="h-10 w-24" />
                )
              ) : null}
            </div>

            <div className="flex gap-4">
              {selectedPlot === "feature" && (
                <Select
                  onValueChange={setSelectedFeature}
                  value={selectedFeature}
                  defaultValue={pipelineFeatures?.data?.data[0]}
                >
                  <SelectTrigger className="w-max">
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
              {selectedPipeline && (
                <Select onValueChange={setSelectedPlot} value={selectedPlot}>
                  <SelectTrigger className="w-max gap-1 truncate">
                    <SelectValue placeholder="Select Plot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="uncertainty">
                        Maximum Magnitude Prediction
                      </SelectItem>
                      <SelectItem value="risk">Risk Prediction</SelectItem>
                      <SelectItem value="feature">
                        Time-Series Features
                      </SelectItem>
                      {filterSelectedPipeline()?.task !== 1 && (
                        <SelectItem value="corr">Correlation</SelectItem>
                      )}
                      <SelectItem value="area">3D Area</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {typeof window !== "undefined" && (
          <div className="mt-4 flex items-center justify-center rounded-md border-2 p-4">
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
                  {/* <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div> */}
                </div>
              ) : selectedPlot === "feature" ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                  {plotDateIsLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <PlotFitur
                      data={plotData?.data}
                      selectedFeature={selectedFeature}
                    />
                  )}
                  {/* <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div> */}
                </div>
              ) : selectedPlot === "corr" ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                  {plotDateIsLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <CorrLabel data={plotData?.data} />
                  )}
                  {/* <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div> */}
                </div>
              ) : selectedPlot === "risk" ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                  {plotDateIsLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <PlotRisk data={plotData?.data} />
                  )}
                  {/* <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div> */}
                </div>
              ) : selectedPlot === "uncertainty" ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                  {plotDateIsLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <PlotUncertainty data={plotData?.data} />
                  )}
                  {/* <div className="chart-legend">
                  <span>Series (Color): </span> <span className="bhn">o C</span>
                  <span className="bhz">o M</span>
                  <span className="bhe">o B</span>
                </div> */}
                </div>
              ) : (
                <span className="text-sm">Select plot first!</span>
              )
            ) : (
              <span className="text-sm">Select pipeline first!</span>
            )}
          </div>
        )}

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
