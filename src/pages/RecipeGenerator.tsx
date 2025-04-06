import React, { useState } from 'react';
import { Search, ChevronRight, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type Recipe = {
  id: string;
  name: string;
  description: string;
  prepTime: string;
  servings: number;
  imageUrl: string;
};

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Tomato Basil Pasta',
    description: 'A simple and delicious pasta with fresh tomatoes and basil.',
    prepTime: '20 min',
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Creamy avocado spread on toasted artisan bread.',
    prepTime: '10 min',
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    name: 'Berry Smoothie Bowl',
    description: 'A refreshing and nutritious smoothie bowl topped with fresh berries.',
    prepTime: '15 min',
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

const RecipeGenerator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes] = useState<Recipe[]>(MOCK_RECIPES);
  const { toast } = useToast();
  const [showStreamlit, setShowStreamlit] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Instead of opening a new tab, embed the Streamlit app by toggling state.
    setShowStreamlit(true);
  };

  return !showStreamlit ? (
    <div className="container py-6 space-y-6">
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">What would you like to cook today?</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter ingredients or dish name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-kitchen-mint focus:ring-kitchen-orange"
          />
          <Button 
            type="submit" 
            className="bg-kitchen-mint hover:bg-kitchen-orange text-kitchen-darkGray hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : <Search size={20} />}
          </Button>
        </form>
      </section>
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recipe Suggestions</h2>
          <Button variant="link" className="text-kitchen-orange p-0">
            See all <ChevronRight size={16} />
          </Button>
        </div>
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <div className="container py-6">
      <Button onClick={() => setShowStreamlit(false)} className="mb-4">Back</Button>
      <div className="h-screen">
        <iframe
          src="http://localhost:8501"
          title="Master Chef Assistant"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex h-32 bg-white">
        <div className="w-1/3">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 p-3 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-kitchen-darkGray">{recipe.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{recipe.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={14} className="mr-1" />
              {recipe.prepTime}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Users size={14} className="mr-1" />
              {recipe.servings} servings
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecipeGenerator;
