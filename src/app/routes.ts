import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { ProvidersDirectory } from "./pages/ProvidersDirectory";
import { ProviderDetail } from "./pages/ProviderDetail";
import { ReviewQueue } from "./pages/ReviewQueue";
import { Reports } from "./pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/upload",
    Component: Upload,
  },
  {
    path: "/providers",
    Component: ProvidersDirectory,
  },
  {
    path: "/providers/:id",
    Component: ProviderDetail,
  },
  {
    path: "/review-queue",
    Component: ReviewQueue,
  },
  {
    path: "/reports",
    Component: Reports,
  },
]);
