import { Route, Routes } from 'react-router';

import Layout from '@/components/Layout';

import InflationRatePage from '@/pages/InflationRatePage';
import OverviewPage from '@/pages/Overview';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="inflation-rate" element={<InflationRatePage />} />
      </Route>
    </Routes>
  );
};

export default App;
