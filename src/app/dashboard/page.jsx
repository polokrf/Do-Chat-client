'use client'
import DashboardLayout from '@/Components/DashboardLayout';
import React, { useState } from 'react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
  <DashboardLayout></DashboardLayout>
  );
};

export default Dashboard;
