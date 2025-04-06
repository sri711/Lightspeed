import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PantryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: string;
};

type GroceryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  isChecked: boolean;
};

const MOCK_PANTRY: PantryItem[] = [
  { id: '1', name: 'Rice', quantity: 2, unit: 'kg', category: 'Grains' },
  { id: '2', name: 'Pasta', quantity: 500, unit: 'g', category: 'Grains' },
  { id: '3', name: 'Olive Oil', quantity: 750, unit: 'ml', category: 'Oils' },
  { id: '4', name: 'Eggs', quantity: 6, unit: 'pcs', category: 'Dairy', expiryDate: '2024-04-15' },
  { id: '5', name: 'Milk', quantity: 1, unit: 'liter', category: 'Dairy', expiryDate: '2024-04-10' },
  { id: '6', name: 'Chicken Breast', quantity: 500, unit: 'g', category: 'Meat', expiryDate: '2024-04-07' },
  { id: '7', name: 'Tomatoes', quantity: 4, unit: 'pcs', category: 'Vegetables' },
];

const MOCK_GROCERY: GroceryItem[] = [
  { id: '1', name: 'Bread', quantity: 1, unit: 'loaf', isChecked: false },
  { id: '2', name: 'Cheese', quantity: 200, unit: 'g', isChecked: false },
  { id: '3', name: 'Apples', quantity: 6, unit: 'pcs', isChecked: true },
];

const CATEGORIES = ['All', 'Grains', 'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Oils', 'Spices'];

const PantryTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(MOCK_PANTRY);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(MOCK_GROCERY);

  const filteredPantryItems = pantryItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleGroceryItem = (id: string) => {
    setGroceryItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <div className="container py-4">
      <Tabs defaultValue="pantry" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="pantry">Pantry</TabsTrigger>
          <TabsTrigger value="grocery">Grocery List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pantry" className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              icon={<Search className="h-4 w-4 text-gray-500" />}
            />
            <Button className="bg-kitchen-orange hover:bg-kitchen-orange/90">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {CATEGORIES.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category 
                      ? "bg-kitchen-mint text-kitchen-darkGray hover:bg-kitchen-mint/90 hover:text-kitchen-darkGray" 
                      : ""
                  }
                  onClick={() => setActiveCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredPantryItems.length === 0 ? (
              <p className="text-center py-6 text-gray-500">No items match your search.</p>
            ) : (
              filteredPantryItems.map(item => (
                <PantryItemCard key={item.id} item={item} />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="grocery" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Shopping List</h3>
            <Button className="bg-kitchen-mint text-kitchen-darkGray hover:bg-kitchen-mint/90">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
          
          <div className="space-y-3">
            {groceryItems.map(item => (
              <GroceryItemCard 
                key={item.id} 
                item={item}
                onToggle={toggleGroceryItem}
              />
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <Button className="w-full bg-kitchen-orange hover:bg-kitchen-orange/90">
              Generate Grocery Plan
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PantryItemCard = ({ item }: { item: PantryItem }) => {
  const isExpiringSoon = item.expiryDate && new Date(item.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  
  return (
    <Card className="p-3 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{item.name}</h4>
          <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200/90">
            {item.category}
          </Badge>
          {isExpiringSoon && (
            <Badge className="bg-red-100 text-red-800">
              Expires soon
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {item.quantity} {item.unit}
          {item.expiryDate && ` • Exp: ${new Date(item.expiryDate).toLocaleDateString()}`}
        </p>
      </div>
      
      <div className="flex space-x-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
          <Edit size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
};

const GroceryItemCard = ({ 
  item, 
  onToggle 
}: { 
  item: GroceryItem, 
  onToggle: (id: string) => void 
}) => {
  return (
    <div 
      className={`p-3 flex items-center border rounded-lg ${
        item.isChecked ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={() => onToggle(item.id)}
        className="h-5 w-5 text-kitchen-orange rounded mr-3 focus:ring-kitchen-orange"
      />
      <div className={`flex-1 ${item.isChecked ? 'line-through text-gray-400' : 'text-black'}`}>
        <p className="font-medium text-black">{item.name}</p>
        <p className="text-sm text-black">{item.quantity} {item.unit}</p>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
        <Edit size={16} />
      </Button>
    </div>
  );
};

export default PantryTracker;
