import { Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Drawer */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-100 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block text-sm text-gray-700 hover:underline">
              Dashboard
            </a>
            <a
              href="/ai-insights"
              className="block text-sm text-gray-700 hover:underline">
              AI Insights
            </a>
            <a
              href="/settings"
              className="block text-sm text-gray-700 hover:underline">
              Settings
            </a>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="pt-16 px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
