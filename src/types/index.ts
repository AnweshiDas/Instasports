export type Listing = {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
  price: number;
  location: string;
  availability?: string[];
  status?: string;
  rating?: number;
  safetyCertified?: boolean;
};

export type CartItem = Listing & { 
  quantity?: number; 
  duration?: string; 
  totalPrice: number; 
  type: "ground" | "equipment" | "coach" 
};
