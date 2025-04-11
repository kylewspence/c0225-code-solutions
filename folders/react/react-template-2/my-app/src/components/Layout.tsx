import { Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <header className="w-full px-6 py-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
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

          <img
            src="/logo-finsight.png"
            alt="FinSight"
            className="h-14 w-auto"
          />
        </div>
        <nav className="space-x-4 text-sm">
          <a href="/dashboard" className="text-gray-700 hover:underline">
            Dashboard
          </a>
          <a href="/ai-insights" className="text-gray-700 hover:underline">
            AI Insights
          </a>
          <a href="/settings" className="text-gray-700 hover:underline">
            Settings
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-24 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
