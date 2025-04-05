
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicinalFood {
  id: number;
  name: string;
  benefits: string[];
  description: string;
  category: string;
}

const TraditionalMedicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const medicinalFoods: MedicinalFood[] = [
    {
      id: 1,
      name: "Turmeric",
      benefits: ["Anti-inflammatory", "Antioxidant", "Improves brain function"],
      description: "A powerful spice with many medicinal properties, commonly used in curries and golden milk.",
      category: "Spice"
    },
    {
      id: 2,
      name: "Ginger",
      benefits: ["Treats nausea", "Reduces muscle pain", "Anti-inflammatory"],
      description: "A root with a spicy flavor used in many traditional medicine systems for thousands of years.",
      category: "Root"
    },
    {
      id: 3,
      name: "Holy Basil (Tulsi)",
      benefits: ["Reduces stress", "Fights infections", "Lowers blood sugar"],
      description: "A sacred plant in Ayurvedic medicine known for its healing properties.",
      category: "Herb"
    },
    {
      id: 4,
      name: "Amla (Indian Gooseberry)",
      benefits: ["High in vitamin C", "Improves immunity", "Promotes hair growth"],
      description: "One of the most important herbs in Ayurveda, known for its rejuvenating properties.",
      category: "Fruit"
    },
    {
      id: 5,
      name: "Fennel Seeds",
      benefits: ["Aids digestion", "Freshens breath", "Relieves colic in infants"],
      description: "Sweet seeds often eaten after meals to aid digestion and freshen breath.",
      category: "Seed"
    },
    {
      id: 6,
      name: "Fenugreek",
      benefits: ["Improves insulin function", "Increases milk production", "Reduces inflammation"],
      description: "Seeds and leaves used in cooking and traditional medicine for various health benefits.",
      category: "Seed"
    },
    {
      id: 7,
      name: "Triphala",
      benefits: ["Digestive aid", "Cleanses the body", "Supports immunity"],
      description: "A combination of three fruits: amla, bibhitaki, and haritaki, used in Ayurvedic medicine.",
      category: "Herbal Formulation"
    },
    {
      id: 8,
      name: "Ashwagandha",
      benefits: ["Reduces anxiety and stress", "Improves concentration", "Boosts energy"],
      description: "An adaptogenic herb used in Ayurvedic medicine to help the body manage stress.",
      category: "Root"
    },
    {
      id: 9,
      name: "Moringa",
      benefits: ["Rich in nutrients", "Lowers blood sugar", "Anti-inflammatory"],
      description: "Leaves, pods and seeds are all utilized for their nutritional and medicinal properties.",
      category: "Plant"
    },
    {
      id: 10,
      name: "Ghee",
      benefits: ["Aids digestion", "Nourishes tissues", "Carries herbs deeper into tissues"],
      description: "Clarified butter used extensively in Ayurvedic medicine and cooking.",
      category: "Dairy"
    },
  ];

  const filteredFoods = medicinalFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = Array.from(new Set(medicinalFoods.map(food => food.category)));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Input
          placeholder="Search traditional medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-secondary"
          icon={<Search className="text-muted-foreground" size={18} />}
        />
      </div>

      {searchTerm === '' && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-secondary px-3 py-1 rounded-full text-sm hover:bg-kitchen-orange hover:text-kitchen-dark transition-colors"
                onClick={() => setSearchTerm(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="card-gradient overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <Leaf size={18} className="text-kitchen-orange mr-2" />
                    {food.name}
                  </h3>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {food.category}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{food.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {food.benefits.map((benefit, index) => (
                      <span 
                        key={index} 
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          index % 3 === 0 ? "bg-kitchen-orange/30 text-kitchen-orange" :
                          index % 3 === 1 ? "bg-emerald-800/30 text-emerald-400" :
                          "bg-blue-800/30 text-blue-400"
                        )}
                      >
                        {benefit}
                      </span>
                    ))}
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

export default TraditionalMedicines;
