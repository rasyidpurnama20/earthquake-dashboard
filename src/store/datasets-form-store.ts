"use client";

import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export const datasetsFormState = observable({
  step: 1,
  data: {
    fileName: "",
    type: "",
    cave: "",
    file: undefined,
    selectedStartDate: "" as unknown as Date,
    selectedEndDate: "" as unknown as Date,
  },
});

persistObservable(datasetsFormState, {
  persistLocal: ObservablePersistLocalStorage,
  local: "datasets-form-store",
});
