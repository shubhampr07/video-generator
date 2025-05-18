"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

const UpgradePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const plans = [
    {
      name: 'Basic',
      price: selectedPlan === 'monthly' ? '$9.99' : '$99.99',
      period: selectedPlan === 'monthly' ? 'month' : 'year',
      description: 'Perfect for beginners',
      features: [
        '10 videos per month',
        'Standard quality',
        'Basic templates',
        'Email support'
      ],
      credits: 10,
      buttonText: 'Get Started',
      highlighted: false,
      priceId: selectedPlan === 'monthly' ? 'price_basic_monthly' : 'price_basic_yearly'
    },
    {
      name: 'Pro',
      price: selectedPlan === 'monthly' ? '$19.99' : '$199.99',
      period: selectedPlan === 'monthly' ? 'month' : 'year',
      description: 'For content creators',
      features: [
        '30 videos per month',
        'HD quality',
        'Premium templates',
        'Priority support',
        'Custom branding'
      ],
      credits: 30,
      buttonText: 'Upgrade to Pro',
      highlighted: true,
      priceId: selectedPlan === 'monthly' ? 'price_pro_monthly' : 'price_pro_yearly'
    },
    {
      name: 'Business',
      price: selectedPlan === 'monthly' ? '$49.99' : '$499.99',
      period: selectedPlan === 'monthly' ? 'month' : 'year',
      description: 'For teams and businesses',
      features: [
        'Unlimited videos',
        '4K quality',
        'All templates',
        '24/7 support',
        'Custom branding',
        'Team collaboration'
      ],
      credits: 100,
      buttonText: 'Contact Sales',
      highlighted: false,
      priceId: selectedPlan === 'monthly' ? 'price_business_monthly' : 'price_business_yearly'
    }
  ];

  const handleCheckout = async (priceId, planName) => {
    // Create a div for the overlay and centered toast
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    document.body.appendChild(overlayDiv);
    
    // Create the toast content div
    const toastDiv = document.createElement('div');
    toastDiv.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md mx-auto transform transition-all';
    toastDiv.innerHTML = `
      <div class="text-center">
        <div class="text-3xl mb-2">🛠️</div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Gateway Maintenance</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">We're currently experiencing issues with our payment gateway. Please try again later! Thank you for your patience. 💖</p>
        <button id="close-toast" class="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-200">Okay</button>
      </div>
    `;
    
    overlayDiv.appendChild(toastDiv);
    
    // Add event listener to close button
    document.getElementById('close-toast').addEventListener('click', () => {
      document.body.removeChild(overlayDiv);
    });
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      if (document.body.contains(overlayDiv)) {
        document.body.removeChild(overlayDiv);
      }
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Upgrade Your Experience</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan to create stunning AI-generated videos for your content needs
          </p>
          
          {/* Billing toggle */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <span className={`text-sm ${selectedPlan === 'monthly' ? 'text-teal-600 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setSelectedPlan(selectedPlan === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-teal-600 transition-colors focus:outline-none"
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${selectedPlan === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`} 
              />
            </button>
            <span className={`text-sm ${selectedPlan === 'yearly' ? 'text-teal-600 font-semibold' : 'text-gray-500'}`}>
              Yearly <span className="text-teal-600 font-medium">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${plan.highlighted ? 'ring-2 ring-teal-500 transform scale-105 bg-white dark:bg-gray-800' : 'bg-white/90 dark:bg-gray-800/90'}`}
            >
              <div className={`p-6 ${plan.highlighted ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-teal-400/20 to-blue-400/20'}`}>
                <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-800 dark:text-white'}`}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-1 text-xl font-semibold ${plan.highlighted ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                  {plan.description}
                </p>
              </div>
              
              <div className="p-6">
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckIcon className="h-5 w-5 text-teal-500" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button
                    onClick={() => handleCheckout(plan.priceId, plan.name)}
                    className={`w-full py-6 ${plan.highlighted ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600' : 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-800'}`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            All plans include access to our basic features. Need a custom plan?
            <button className="ml-1 text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
              Contact us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;