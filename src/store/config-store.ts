import { configureObservablePersistence } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";

enableReactUse();
configureObservablePersistence({
  // Use Local Storage on web
  persistLocal: ObservablePersistLocalStorage,
});
