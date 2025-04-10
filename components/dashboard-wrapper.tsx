'use client';

import { Suspense } from 'react';
import Dashboard from './dashboard';
import Loading from '@/app/loading';
import type { AnalyticsData } from '@/lib/db'; // adjust if your types are elsewhere

export default function DashboardWrapper({ data }: { data: AnalyticsData }) {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard initialData={data} />
    </Suspense>
  );
}
