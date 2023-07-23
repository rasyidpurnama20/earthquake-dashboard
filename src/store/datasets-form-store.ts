"use client";

import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

type IDatasetFormState = {
  data: {
    fileName: string;
    type: undefined | "m" | "b" | "c" | string;
    cave: undefined | "dmlz" | "gbc" | string;
    file: undefined | string | File | File[];
    selectedStartDate: Date;
    selectedEndDate: Date;
  };
};

export const datasetsFormState = observable<IDatasetFormState>({
  data: {
    fileName: "",
    type: undefined,
    cave: undefined,
    file: undefined,
    selectedStartDate: "" as unknown as Date,
    selectedEndDate: "" as unknown as Date,
  },
});

persistObservable(datasetsFormState, {
  persistLocal: ObservablePersistLocalStorage,
  local: "datasets-form-store",
});
