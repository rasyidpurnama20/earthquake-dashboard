"use client";

import { DatasetsFormStep1 } from "@/components/forms/datasets-form/step-1";

export default function Step1() {
  if (typeof window === "undefined") return null;

  return (
    <div>
      <DatasetsFormStep1 />
    </div>
  );
}
