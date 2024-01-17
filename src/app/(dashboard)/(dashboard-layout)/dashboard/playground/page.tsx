"use client";

// import PlotlyComponent from "@/components/charts/AreaChart2";
// import CorrLabel from "@/components/charts/Bar";
// import PlotFitur from "@/components/charts/Line";
// import PlotRisk from "@/components/charts/Line2";
// import PlotUncertainty from "@/components/charts/Area";
// import { Input, Label } from "@/components/ui";

// const exampleData = {
//   x: [0, 1, 2, 3, 4, 5],
//   y: [0, 2, 4, 6, 8, 10],
//   z: [0, 3, 6, 9, 12, 15],
//   series: [20, 60, 60, 40, 20],
// };

export default function Dashboard() {
  if (typeof window === "undefined") return null;
  return (
    <div className="flex flex-col space-y-3 p-4 pl-0">
      <div className="sticky top-4 z-10 flex h-16 items-center justify-between rounded-lg border bg-white/50 p-6 pr-4 backdrop-blur-2xl transition-all duration-150 ease-in-out">
        <span className="font-heading text-xl font-medium">Playground</span>
      </div>

      <div className="flex flex-col flex-wrap space-y-4 rounded-lg border p-6">
        {/* <div>
          <iframe
            src="https://kitware.github.io/glance/app/?name=diskout.vtp&url=https://data.kitware.com/api/v1/item/59de9de58d777f31ac641dc5/download"
            className="h-screen w-full rounded-lg border"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div> */}

        {/* <div className="grid grid-cols-3 gap-4">
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
        </div> */}
      </div>
    </div>
  );
}
