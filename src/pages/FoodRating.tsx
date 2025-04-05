
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

interface FoodProduct {
  id: number;
  name: string;
  category: string;
  rating: number;
  description: string;
  nutritionRating: number;
  processingRating: number;
  additivesRating: number;
  environmentalRating: number;
}

const FoodRating = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const foodProducts: FoodProduct[] = [
    {
      id: 1,
      name: "Organic Granola",
      category: "Breakfast",
      rating: 4.5,
      description: "Whole grain oats with nuts and dried fruits",
      nutritionRating: 4.7,
      processingRating: 4.2,
      additivesRating: 4.8,
      environmentalRating: 4.3
    },
    {
      id: 2,
      name: "Energy Drink XL",
      category: "Beverages",
      rating: 1.5,
      description: "High caffeine energy drink with artificial sweeteners",
      nutritionRating: 1.0,
      processingRating: 1.5,
      additivesRating: 1.2,
      environmentalRating: 2.3
    },
    {
      id: 3,
      name: "Potato Chips",
      category: "Snacks",
      rating: 2.0,
      description: "Fried potato chips with salt and artificial flavors",
      nutritionRating: 1.8,
      processingRating: 2.0,
      additivesRating: 1.5,
      environmentalRating: 2.7
    },
    {
      id: 4,
      name: "Greek Yogurt",
      category: "Dairy",
      rating: 4.2,
      description: "High protein yogurt with active cultures",
      nutritionRating: 4.5,
      processingRating: 4.0,
      additivesRating: 4.5,
      environmentalRating: 3.8
    },
    {
      id: 5,
      name: "Protein Bar",
      category: "Snacks",
      rating: 3.0,
      description: "Protein-rich snack bar with nuts and chocolate",
      nutritionRating: 3.2,
      processingRating: 2.8,
      additivesRating: 2.5,
      environmentalRating: 3.5
    },
    {
      id: 6,
      name: "Frozen Pizza",
      category: "Frozen Foods",
      rating: 2.3,
      description: "Ready-to-bake pizza with processed meats",
      nutritionRating: 2.0,
      processingRating: 1.8,
      additivesRating: 2.5,
      environmentalRating: 2.9
    },
    {
      id: 7,
      name: "Quinoa",
      category: "Grains",
      rating: 4.8,
      description: "Whole grain rich in protein and fiber",
      nutritionRating: 5.0,
      processingRating: 4.9,
      additivesRating: 5.0,
      environmentalRating: 4.3
    },
    {
      id: 8,
      name: "Chocolate Cookies",
      category: "Snacks",
      rating: 2.5,
      description: "Sweet cookies with chocolate chips",
      nutritionRating: 2.0,
      processingRating: 2.5,
      additivesRating: 2.8,
      environmentalRating: 2.7
    },
    {
      id: 9,
      name: "Almond Milk",
      category: "Beverages",
      rating: 3.8,
      description: "Plant-based milk alternative",
      nutritionRating: 3.5,
      processingRating: 3.7,
      additivesRating: 4.0,
      environmentalRating: 4.0
    },
    {
      id: 10,
      name: "Canned Soup",
      category: "Canned Goods",
      rating: 2.7,
      description: "Ready-to-eat soup with vegetables and broth",
      nutritionRating: 3.0,
      processingRating: 2.3,
      additivesRating: 2.5,
      environmentalRating: 3.0
    }
  ];

  const categories = ["Breakfast", "Beverages", "Snacks", "Dairy", "Frozen Foods", "Grains", "Canned Goods"];

  // Filter products based on search term and active tab
  const filteredProducts = foodProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => activeTab === 'all' || product.category === activeTab);

  // Get rating color based on score
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    if (rating >= 2) return "text-orange-400";
    return "text-red-400";
  };

  // Render rating stars
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} fill="currentColor" className={getRatingColor(rating)} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={16} fill="currentColor" className="text-gray-600" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star size={16} fill="currentColor" className={getRatingColor(rating)} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-600" />);
      }
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Input
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-secondary"
          icon={<Search className="text-muted-foreground" size={18} />}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex items-center mb-2">
          <Filter size={18} className="mr-2" />
          <h2 className="text-lg font-medium">Categories</h2>
        </div>
        <TabsList className="bg-secondary/50 w-full h-auto flex flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="card-gradient overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                {renderRatingStars(product.rating)}
                <span className={cn("ml-2 font-medium", getRatingColor(product.rating))}>
                  {product.rating.toFixed(1)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground">Nutrition</span>
                    <span className={getRatingColor(product.nutritionRating)}>
                      {product.nutritionRating.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full", 
                        product.nutritionRating >= 4 ? "bg-green-400" : 
                        product.nutritionRating >= 3 ? "bg-yellow-400" : 
                        product.nutritionRating >= 2 ? "bg-orange-400" : "bg-red-400"
                      )}
                      style={{ width: `${product.nutritionRating * 20}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground">Processing</span>
                    <span className={getRatingColor(product.processingRating)}>
                      {product.processingRating.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full", 
                        product.processingRating >= 4 ? "bg-green-400" : 
                        product.processingRating >= 3 ? "bg-yellow-400" : 
                        product.processingRating >= 2 ? "bg-orange-400" : "bg-red-400"
                      )}
                      style={{ width: `${product.processingRating * 20}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground">Additives</span>
                    <span className={getRatingColor(product.additivesRating)}>
                      {product.additivesRating.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full", 
                        product.additivesRating >= 4 ? "bg-green-400" : 
                        product.additivesRating >= 3 ? "bg-yellow-400" : 
                        product.additivesRating >= 2 ? "bg-orange-400" : "bg-red-400"
                      )}
                      style={{ width: `${product.additivesRating * 20}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground">Environmental</span>
                    <span className={getRatingColor(product.environmentalRating)}>
                      {product.environmentalRating.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full", 
                        product.environmentalRating >= 4 ? "bg-green-400" : 
                        product.environmentalRating >= 3 ? "bg-yellow-400" : 
                        product.environmentalRating >= 2 ? "bg-orange-400" : "bg-red-400"
                      )}
                      style={{ width: `${product.environmentalRating * 20}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodRating;
