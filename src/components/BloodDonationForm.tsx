
import React, { useState } from 'react';
import { PeopleInNeed } from './PeopleInNeed';
import { usePoints } from '../contexts/PointsContext';
import { toast } from '@/components/ui/use-toast';

interface DonorData {
  donorName: string;
  age: string;
  gender: string;
  phone: string;
  bloodGroup: string;
  availability: string;
  address: string;
}

export const BloodDonationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<DonorData>({
    donorName: '',
    age: '',
    gender: 'male',
    phone: '',
    bloodGroup: 'A+',
    availability: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save donor data to localStorage
    const existingDonors = JSON.parse(localStorage.getItem('blood-donors') || '[]');
    const updatedDonors = [...existingDonors, formData];
    localStorage.setItem('blood-donors', JSON.stringify(updatedDonors));
    
    toast({
      title: "Thank you for registering!",
      description: "Your information has been saved. You may be contacted when someone needs your blood type.",
      variant: "default",
    });
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <PeopleInNeed donorBloodGroup={formData.bloodGroup} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blood">Donate Blood</h2>
          <p className="text-muted-foreground">Please fill in your details to become a donor</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="donorName" className="block text-sm font-medium">
              Donor Name
            </label>
            <input
              id="donorName"
              name="donorName"
              type="text"
              required
              value={formData.donorName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="Your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="Must be 18-65"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="We'll contact you here"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bloodGroup" className="block text-sm font-medium">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              required
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="availability" className="block text-sm font-medium">
              Availability (Date/Time)
            </label>
            <input
              id="availability"
              name="availability"
              type="text"
              required
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g., Weekdays after 5PM"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
              placeholder="Your current location"
            />
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blood text-white font-medium rounded-lg shadow-sm hover:bg-blood-dark transition-colors button-effect"
          >
            Register as Donor
          </button>
        </div>
      </form>
    </div>
  );
};
