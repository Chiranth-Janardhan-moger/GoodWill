
import React, { useState } from 'react';
import { DonorList } from './DonorList';
import { toast } from '@/components/ui/use-toast';

export const BloodRequestForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'male',
    phone: '',
    bloodGroup: 'A+',
    amount: '',
    hospital: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Save patient request to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('blood-requests') || '[]');
    const updatedRequests = [...existingRequests, formData];
    localStorage.setItem('blood-requests', JSON.stringify(updatedRequests));
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setIsSubmitted(true);
      
      toast({
        title: "Request submitted",
        description: "We're connecting you with compatible donors in your area.",
        variant: "default",
      });
    }, 2000);
  };

  if (isSubmitted) {
    return <DonorList bloodGroup={formData.bloodGroup} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {isSearching ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-block mb-6 h-12 w-12 rounded-full border-4 border-blood border-t-transparent animate-spin"></div>
          <h2 className="text-2xl font-bold mb-2 text-blood">Searching for donors...</h2>
          <p className="text-muted-foreground">Looking for compatible {formData.bloodGroup} donors near you</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blood">Request Blood Donation</h2>
            <p className="text-muted-foreground">Please fill in the patient details</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="patientName" className="block text-sm font-medium">
                Patient Name
              </label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                required
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
                placeholder="Patient's full name"
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
                placeholder="Patient's age"
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
                placeholder="Contact number"
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
              <label htmlFor="amount" className="block text-sm font-medium">
                Amount Required (units)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                required
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
                placeholder="Number of units needed"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="hospital" className="block text-sm font-medium">
                Hospital Name
              </label>
              <input
                id="hospital"
                name="hospital"
                type="text"
                required
                value={formData.hospital}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blood focus:border-transparent outline-none transition-all"
                placeholder="Name of hospital"
              />
            </div>
            
            <div className="space-y-2">
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
                placeholder="Hospital or patient location"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blood text-white font-medium rounded-lg shadow-sm hover:bg-blood-dark transition-colors button-effect"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
