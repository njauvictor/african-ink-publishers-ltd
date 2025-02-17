// app/admin/layout.js
import SideBar from '@/components/admin/SideBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex gap-4 flex-col md:flex-row md:p-8">
      <div>
        <SideBar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}