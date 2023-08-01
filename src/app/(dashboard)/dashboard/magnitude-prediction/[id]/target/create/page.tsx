"use client";

import { PipelineCreateTargetForm } from "@/components";

export default function CreatePrediction() {
  if (typeof window === "undefined") return null;
  return (
    <div>
      <PipelineCreateTargetForm />
    </div>
  );
}
