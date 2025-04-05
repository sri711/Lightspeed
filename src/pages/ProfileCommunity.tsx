
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Camera, Plus } from 'lucide-react';

type UserProfile = {
  name: string;
  avatar: string;
  diet: string[];
  allergies: string[];
};

type CommunityPost = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
};

const MOCK_PROFILE: UserProfile = {
  name: "Alex Johnson",
  avatar: "https://i.pravatar.cc/150?img=11",
  diet: ["Vegetarian", "Low-carb"],
  allergies: ["Peanuts", "Shellfish"]
};

const MOCK_POSTS: CommunityPost[] = [
  {
    id: "1",
    user: {
      name: "Maria Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=16"
    },
    content: "Made this amazing pasta dish tonight! The secret is in the homemade sauce 👨‍🍳",
    image: "https://images.unsplash.com/photo-1579349443343-73da56a71a20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    user: {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    content: "First attempt at making sourdough bread from scratch! What do you think? Any tips for next time?",
    image: "https://images.unsplash.com/photo-1585478259715-4ff5ee7ca6e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 42,
    comments: 15,
    timestamp: "5 hours ago"
  }
];

const ProfileCommunity = () => {
  return (
    <Tabs defaultValue="profile" className="container py-4">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="profile">My Profile</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-6">
        <ProfileSection profile={MOCK_PROFILE} />
        <PreferencesSection profile={MOCK_PROFILE} />
      </TabsContent>
      
      <TabsContent value="community">
        <CommunitySection posts={MOCK_POSTS} />
      </TabsContent>
    </Tabs>
  );
};

const ProfileSection = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <Avatar className="h-16 w-16">
        <AvatarImage src={profile.avatar} alt={profile.name} />
        <AvatarFallback>{profile.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-500">KitchenAssistant Member</p>
        <Button variant="outline" size="sm" className="mt-2 text-kitchen-orange border-kitchen-orange">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

const PreferencesSection = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">My Preferences</h3>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-medium mb-2">Diet Preferences</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.diet.map(diet => (
            <Badge key={diet} className="bg-kitchen-mint text-kitchen-darkGray hover:bg-kitchen-mint/80">
              {diet}
            </Badge>
          ))}
          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
            <Plus size={14} />
          </Button>
        </div>
        
        <h4 className="font-medium mb-2">Allergies & Restrictions</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.allergies.map(allergy => (
            <Badge key={allergy} className="bg-red-100 text-red-800 hover:bg-red-100/80">
              {allergy}
            </Badge>
          ))}
          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
            <Plus size={14} />
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-medium mb-4">App Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Personalize recipes based on my profile</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Notification for community posts</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Pantry reminder notifications</span>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunitySection = ({ posts }: { posts: CommunityPost[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Community Kitchen</h3>
        <Button size="sm" className="bg-kitchen-orange hover:bg-kitchen-orange/90 flex gap-1 items-center">
          <Camera size={16} />
          <span>Post</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.user.name}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            
            <p className="mb-3">{post.content}</p>
            
            <img 
              src={post.image} 
              alt="Post image" 
              className="w-full h-48 object-cover rounded-lg mb-3" 
            />
            
            <div className="flex justify-between text-sm text-gray-500">
              <button className="flex items-center gap-1">
                <Heart size={16} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span>{post.comments} comments</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileCommunity;
