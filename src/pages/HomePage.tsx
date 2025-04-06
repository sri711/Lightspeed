
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Leaf, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <ChefHat size={32} className="text-kitchen-orange" />,
      title: "Recipe Generator",
      description: "Generate custom recipes based on your preferences and available ingredients",
      path: "/"
    },
    {
      icon: <Star size={32} className="text-kitchen-orange" />,
      title: "Food Rating System",
      description: "Discover and rate food products from 0-5 stars",
      path: "/food-rating"
    },
    {
      icon: <Leaf size={32} className="text-kitchen-orange" />,
      title: "Traditional Medicines",
      description: "Explore traditional food ingredients with medicinal properties",
      path: "/traditional-medicines"
    },
    {
      icon: <Plus size={32} className="text-kitchen-orange" />,
      title: "Pantry Tracker",
      description: "Keep track of your kitchen ingredients and plan your grocery shopping",
      path: "/pantry"
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 animate-fade-in">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-kitchen-orange p-4 rounded-full mb-4">
          <ChefHat size={48} className="text-kitchen-dark" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">KitchenMate</h1>
        <p className="text-muted-foreground text-center">Your AI-powered kitchen management companion</p>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="card-gradient hover:bg-secondary/80 transition-colors cursor-pointer"
            onClick={() => navigate(feature.path)}
          >
            <CardContent className="p-4 flex items-center">
              <div className="mr-4 bg-secondary/50 p-2 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">{feature.title}</h2>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <Button 
          variant="outline" 
          className="border-kitchen-orange text-kitchen-orange hover:bg-kitchen-orange/20"
          onClick={() => navigate('/profile')}
        >
          View Profile & Community
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
