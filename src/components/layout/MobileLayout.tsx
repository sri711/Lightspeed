
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChefHat, Book, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

type MobileLayoutProps = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-kitchen-lightGray">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      
      {/* Navigation */}
      <BottomNav />
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Recipe Generator';
      case '/profile':
        return 'Profile & Community';
      case '/pantry':
        return 'Pantry Tracker';
      default:
        return 'KitchenAssistant';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container flex items-center justify-center h-16">
        <h1 className="text-xl font-bold text-kitchen-darkGray">
          {getTitle()}
        </h1>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <ChefHat size={24} />, label: 'Recipes' },
    { path: '/profile', icon: <User size={24} />, label: 'Profile' },
    { path: '/pantry', icon: <ShoppingCart size={24} />, label: 'Pantry' }
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full",
              isActive 
                ? "text-kitchen-orange font-medium" 
                : "text-gray-500"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileLayout;
