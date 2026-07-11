import { Outlet } from 'react-router';

import Navbar from '@/components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-svh font-sans">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
