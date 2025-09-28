import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Phone } from "lucide-react";

type SafetyModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SafetyModal = ({ open, onClose }: SafetyModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md rounded-xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Safety First</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm">
        <p>At Instasports, your safety is our priority. All venues and coaches are verified.</p>
        <div className="space-y-2">
          <h4 className="font-semibold">Emergency Contacts:</h4>
          <div className="flex justify-between"><span>Police</span><span className="font-bold">100</span></div>
          <div className="flex justify-between"><span>Ambulance</span><span className="font-bold">108</span></div>
          <div className="flex justify-between"><span>Fire</span><span className="font-bold">101</span></div>
          <div className="flex justify-between"><span>Support</span><span className="font-bold">+91-22-12345678</span></div>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>Wear proper gear and follow coach instructions.</li>
          <li>Report any issues immediately via app chat.</li>
          <li>Venues have first-aid kits and CCTV.</li>
        </ul>
        <Button onClick={onClose} className="w-full">Got It</Button>
      </div>
    </DialogContent>
  </Dialog>
);
