import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;