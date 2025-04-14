import { Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Layout = () => {
  return (
    <div className="bg-blue-50 text-gray-800">
      <header className="w-full px-6 py-4 border-b border-blue-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-blue-50">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white p-4 border-r border-blue-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Menu</h2>
              <nav className="space-y-2">
                <a
                  href="/dashboard"
                  className="block text-sm text-gray-600 hover:text-gray-900 hover:underline">
                  Dashboard
                </a>
                <a
                  href="/ai-insights"
                  className="block text-sm text-gray-600 hover:text-gray-900 hover:underline">
                  AI Insights
                </a>
                <a
                  href="/settings"
                  className="block text-sm text-gray-600 hover:text-gray-900 hover:underline">
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          <img
            src="/logo-finsight.png"
            alt="FinSight"
            className="h-14 w-auto"
          />
        </div>
        <nav className="space-x-4 text-sm">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900 hover:underline">
            Dashboard
          </a>
          <a href="/ai-insights" className="text-gray-600 hover:text-gray-900 hover:underline">
            AI Insights
          </a>
          <a href="/settings" className="text-gray-600 hover:text-gray-900 hover:underline">
            Settings
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-2 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
