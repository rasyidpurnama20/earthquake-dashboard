"use client";

import PlotlyComponent from "@/components/charts/AreaChart2";
import CorrLabel from "@/components/charts/Bar";
import PlotFitur from "@/components/charts/Line";
import PlotRisk from "@/components/charts/Line2";
import PlotUncertainty from "@/components/charts/Area";
import { Input, Label } from "@/components/ui";

const exampleData = {
  x: [0, 1, 2, 3, 4, 5],
  y: [0, 2, 4, 6, 8, 10],
  z: [0, 3, 6, 9, 12, 15],
  series: [20, 60, 60, 40, 20],
};

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <span>Dashboard</span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="catalog">Catalog</Label>
            <Input id="catalog" type="file" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="mucking">Mucking</Label>
            <Input id="mucking" type="file" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="blasting">Blasting</Label>
            <Input id="blasting" type="file" />
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-2 rounded-md border p-2">
          <div className="h-200 flex w-full">
            <PlotlyComponent
              x={exampleData.x}
              y={exampleData.y}
              z={exampleData.z}
              series={exampleData.series}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-100 flex flex-col rounded-md border p-4">
            <span className="text-sm font-medium">Feature</span>
            <PlotFitur data={1} />
          </div>
          <div className="h-100 flex flex-col rounded-md border p-4">
            <span className="text-sm font-medium">Correlation</span>
            <CorrLabel data={1} />
          </div>
          <div className="h-100 flex flex-col rounded-md border p-4">
            <span className="text-sm font-medium">Risk</span>
            <PlotRisk data={1} />
          </div>
          <div className="h-100 flex flex-col rounded-md border p-4">
            <span className="text-sm font-medium">Uncertainty</span>
            <PlotUncertainty data={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
