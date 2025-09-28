import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Clock, Calendar, Users, Star, Phone, Shield, BookOpen, User, Heart, Award } from "lucide-react";
import { ListingCard } from "@/components/ListingCard";
import { SafetyModal } from "@/components/SafetyModal";
import { FounderCard } from "@/components/FounderCard";
import { mockGrounds, mockEquipment, mockCoaches, founders, testimonials } from "@/data/mockData";
import { Listing, CartItem } from "@/types";

export default function SportsBookingApp() {
  // State variables
  const [location, setLocation] = useState<string>("all");
  const [duration, setDuration] = useState<string>("1");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("grounds");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>("");
  
  // Filter listings based on location and tab
  const filteredGrounds = useMemo(() => {
    return location === "all" 
      ? mockGrounds 
      : mockGrounds.filter(ground => ground.location === location);
  }, [location]);
  
  const filteredEquipment = useMemo(() => {
    return mockEquipment; // Equipment available at all locations
  }, []);
  
  const filteredCoaches = useMemo(() => {
    return location === "all" 
      ? mockCoaches 
      : mockCoaches.filter(coach => coach.location === location);
  }, [location]);
  
  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } 
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  // Calculate total price
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + (item.totalPrice * (item.quantity || 1)), 0);
  }, [cart]);
  
  // Handle booking
  const handleBooking = () => {
    if (cart.length === 0) {
      setBookingError("Your cart is empty. Please add items before booking.");
      return;
    }
    
    if (!selectedDate) {
      setBookingError("Please select a date for your booking.");
      return;
    }
    
    // Simulate booking process
    setTimeout(() => {
      setBookingSuccess(true);
      setCart([]);
      setBookingError("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setBookingSuccess(false), 5000);
    }, 1000);
  };
  
  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-blue-800">Instasports</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSafetyModal(true)}
              className="flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> Safety
            </Button>
            
            <div className="relative">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4 mr-2" />
                My Cart ({cart.length})
              </Button>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Booking Success/Error Alerts */}
        <AnimatePresence>
          {bookingSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert className="bg-green-50 border-green-200">
                <Heart className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Booking confirmed! You'll receive a confirmation email shortly.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          {bookingError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  {bookingError}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="location" className="text-gray-700 mb-2 block">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="duration" className="text-gray-700 mb-2 block">Duration (hours)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hour</SelectItem>
                  <SelectItem value="2">2 Hours</SelectItem>
                  <SelectItem value="3">3 Hours</SelectItem>
                  <SelectItem value="4">4 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date" className="text-gray-700 mb-2 block">Booking Date</Label>
              <Input 
                type="date" 
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="flex border-b border-gray-200 mb-8">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'grounds' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('grounds')}
          >
            Sports Grounds
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'equipment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('equipment')}
          >
            Equipment Rental
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'coaches' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('coaches')}
          >
            Certified Coaches
          </button>
        </div>
        
        {/* Listings Section */}
        <div className="mb-16">
          {activeTab === 'grounds' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sports Grounds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrounds.map(ground => (
                  <ListingCard 
                    key={ground.id}
                    item={ground}
                    type="ground"
                    duration={duration}
                    onAddToCart={addToCart}
                    isAvailable={ground.status === "Available"}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                    itemId={ground.id}
                  />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'equipment' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipment Rental</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map(equipment => (
                  <ListingCard 
                    key={equipment.id}
                    item={equipment}
                    type="equipment"
                    duration={duration}
                    onAddToCart={addToCart}
                    isAvailable={true}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                    itemId={equipment.id}
                  />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'coaches' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Certified Coaches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.map(coach => (
                  <ListingCard 
                    key={coach.id}
                    item={coach}
                    type="coach"
                    duration={duration}
                    onAddToCart={addToCart}
                    isAvailable={true}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                    itemId={coach.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Cart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Booking Cart</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">Your cart is empty</div>
              <p className="text-gray-600">Add grounds, equipment, or coaches to your cart to book them.</p>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.type === "equipment" 
                            ? `₹${item.price}/session` 
                            : `₹${item.price}/hr × ${duration}h`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-medium mr-4">₹{item.totalPrice}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                  <div className="text-lg font-bold">Total: ₹{totalPrice}</div>
                  <div className="text-sm text-gray-600">
                    {selectedDate ? `Booking for ${new Date(selectedDate).toLocaleDateString()}` : "Select a date"}
                  </div>
                </div>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleBooking}
                >
                  Complete Booking
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Founders Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map(founder => (
              <Card key={founder.name} className="border-0 shadow-sm bg-white rounded-xl p-6">
                <FounderCard founder={founder} />
              </Card>
            ))}
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  {renderRating(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.review}"</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Instasports</h3>
              </div>
              <p className="text-gray-400">
                Making sports accessible and safe for everyone across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Sports Grounds</a></li>
                <li><a href="#" className="hover:text-white">Equipment</a></li>
                <li><a href="#" className="hover:text-white">Coaches</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Safety</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Emergency Contacts</a></li>
                <li><a href="#" className="hover:text-white">Verification Process</a></li>
                <li><a href="#" className="hover:text-white">Report an Issue</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91-22-12345678</li>
                <li>support@instasports.in</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 Instasports. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Safety Modal */}
      <SafetyModal open={showSafetyModal} onClose={() => setShowSafetyModal(false)} />
    </div>
  );
}
