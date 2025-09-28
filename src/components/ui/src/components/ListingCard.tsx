import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Shield, Star } from "lucide-react";
import { Listing, CartItem } from "@/types";

type ListingCardProps = {
  item: Listing;
  type: "ground" | "equipment" | "coach";
  duration: string;
  onAddToCart: (item: CartItem) => void;
  isAvailable?: boolean;
  hoveredCard: string | null;
  setHoveredCard: (id: string | null) => void;
  itemId: string;
};

export const ListingCard = ({ 
  item, 
  type, 
  duration, 
  onAddToCart, 
  isAvailable, 
  hoveredCard, 
  setHoveredCard, 
  itemId 
}: ListingCardProps) => {
  const basePrice = item.price;
  const totalPrice = type === "equipment" ? basePrice : basePrice * parseInt(duration);
  const handleAdd = () => onAddToCart({ ...item, totalPrice, duration, type, quantity: 1 });

  return (
    <motion.div whileHover={{ y: -4 }} onHoverStart={() => setHoveredCard(itemId)} onHoverEnd={() => setHoveredCard(null)}>
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-0 bg-white rounded-xl">
        <div className="relative h-48 overflow-hidden">
          <motion.img src={item.image} alt={item.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} />
          {hoveredCard === itemId && (
            <motion.div className="absolute inset-0 bg-black/20 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button variant="secondary" size="sm">Quick View</Button>
            </motion.div>
          )}
          {item.safetyCertified && (
            <div className="absolute top-2 right-2 bg-green-100 p-1 rounded-full">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold text-gray-900">{item.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" /> {item.description || "Available at all locations"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-3">{item.details}</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-blue-600">
              {type === "equipment" ? `₹${basePrice}/session` : `₹${basePrice}/hr`}
            </span>
            {type === "coach" && <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {item.rating}</div>}
          </div>
          {type === "ground" && <span className={`text-xs px-3 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{isAvailable ? 'Available' : 'Booked'}</span>}
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg font-medium" onClick={handleAdd} disabled={!isAvailable && type === "ground"}>
            {type === "ground" ? "Book Now" : type === "coach" ? "Book Session" : "Rent Now"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
