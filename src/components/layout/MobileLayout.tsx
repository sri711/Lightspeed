
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChefHat, User, ShoppingCart, Leaf, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type MobileLayoutProps = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-kitchen-dark">
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
      case '/home':
        return 'KitchenAssistant';
      case '/':
        return 'Recipe Generator';
      case '/profile':
        return 'Profile & Community';
      case '/pantry':
        return 'Pantry Tracker';
      case '/traditional-medicines':
        return 'Traditional Medicines';
      case '/food-rating':
        return 'Food Rating System';
      default:
        return 'KitchenAssistant';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-kitchen-dark shadow-md border-b border-kitchen-darkAccent">
      <div className="container flex items-center justify-center h-16">
        <div className="flex items-center">
          {location.pathname === '/home' && (
            <ChefHat size={24} className="text-kitchen-orange mr-2" />
          )}
          <h1 className="text-xl font-bold text-white">
            {getTitle()}
          </h1>
        </div>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: <ChefHat size={22} />, label: 'Home' },
    { path: '/', icon: <ChefHat size={22} />, label: 'Recipes' },
    { path: '/food-rating', icon: <Star size={22} />, label: 'Ratings' },
    { path: '/traditional-medicines', icon: <Leaf size={22} />, label: 'Medicines' },
    { path: '/pantry', icon: <ShoppingCart size={22} />, label: 'Pantry' }
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-kitchen-dark shadow-[0_-2px_10px_rgba(0,0,0,0.3)] z-10 border-t border-kitchen-darkAccent">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full",
              isActive 
                ? "text-kitchen-orange font-medium" 
                : "text-gray-500 hover:text-gray-300"
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
