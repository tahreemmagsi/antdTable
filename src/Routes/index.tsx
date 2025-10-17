import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppLayout from "../Components/layout";
import PopupEditTable from "../Pages/EditTable";
import PartialEditTable from "../Pages/PartialEditTable";

import ConfigurableTable from "../Pages/ConfigureTable";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<PopupEditTable />} />
          <Route path="/partial" element={<PartialEditTable />} />
          <Route path="/configurable" element={<ConfigurableTable />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
