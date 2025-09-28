import { motion } from "framer-motion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type FounderCardProps = {
  founder: {
    name: string;
    role: string;
    bio: string;
  };
};

export const FounderCard = ({ founder }: FounderCardProps) => {
  const initials = founder.name.split(' ').map(n => n[0]).join('');
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        <span className="text-2xl font-bold text-blue-600">{initials}</span>
      </div>
      <CardTitle className="font-semibold mb-1">{founder.name}</CardTitle>
      <CardDescription className="text-sm mb-3">{founder.role}</CardDescription>
      <p className="text-gray-600 text-sm">{founder.bio}</p>
    </motion.div>
  );
};
