import { Route, Routes } from 'react-router';

import Layout from '@/components/Layout';

import InflationRatePage from '@/pages/InflationRatePage';
import InterestRatePage from '@/pages/InterestRatePage';
import OverviewPage from '@/pages/Overview';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="inflation-rate" element={<InflationRatePage />} />
        <Route path="huf-interest-rate" element={<InterestRatePage />} />
      </Route>
    </Routes>
  );
};

export default App;
