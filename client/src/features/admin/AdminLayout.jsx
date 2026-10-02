import React from 'react';
import { Outlet } from 'react-router-dom';
import './admin.css';
import './admin_app.css';

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <Outlet />
    </div>
  );
}
