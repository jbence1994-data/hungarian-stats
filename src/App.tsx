import { Route, Routes } from 'react-router';

import { Layout } from '@/components/Layout';

import { EconomyPage } from '@/pages/Economy';
import { OverviewPage } from '@/pages/Overview';
import { PopulationPage } from '@/pages/Population';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="population" element={<PopulationPage />} />
        <Route path="economy" element={<EconomyPage />} />
      </Route>
    </Routes>
  );
};

export default App;
