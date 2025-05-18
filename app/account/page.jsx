"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { UserDetailContext } from '../_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { CircleUser, CreditCard, LogOut, Mail, Package, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AccountPage = () => {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(true);
  const { signOut } = useClerk();
  const router = useRouter();
  
  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  // Determine subscription tier based on credits
  const getSubscriptionTier = () => {
    if (!userDetail?.credits) return 'Free';
    if (userDetail.credits >= 100) return 'Business';
    if (userDetail.credits >= 30) return 'Pro';
    if (userDetail.credits >= 10) return 'Basic';
    return 'Free';
  };

  const tier = getSubscriptionTier();
  const isPremium = tier !== 'Free';

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Account</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your account settings and subscription</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 p-8 pb-24">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-700 p-1 shadow-lg">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <CircleUser className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-16 px-8 pb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {user?.fullName || 'User'}
                </h2>
                <div className="flex items-center justify-center mt-1 text-gray-500 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
                
                {/* Subscription Badge */}
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isPremium ? 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {isPremium && <Star className="h-3.5 w-3.5 mr-1 text-teal-600 dark:text-teal-400" />}
                    {tier} Plan
                  </span>
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                    <Package className="h-5 w-5 mr-2 text-teal-500" />
                    Subscription Details
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Plan</span>
                      <span className="font-medium text-gray-800 dark:text-white">{tier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Credits Remaining</span>
                      <span className="font-medium text-gray-800 dark:text-white">{userDetail?.credits || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status</span>
                      <span className={`font-medium ${isPremium ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {isPremium ? 'Active' : 'Free Tier'}
                      </span>
                    </div>
                  </div>
                  {!isPremium && (
                    <div className="mt-6">
                      <Link href="/upgrade">
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                          Upgrade Now
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-teal-500" />
                    Billing Information
                  </h3>
                  {isPremium ? (
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                        <span className="font-medium text-gray-800 dark:text-white">•••• 4242</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Next Billing Date</span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-6">
                        <Button variant="outline" className="w-full border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20">
                          Manage Billing
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        No billing information available. Upgrade to a paid plan to access premium features.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 border-gray-300 dark:border-gray-600">
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300 dark:border-gray-600">
                  Change Password
                </Button>
                {isPremium && (
                  <Button variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                    Cancel Subscription
                  </Button>
                )}
              </div>
              
              {/* Logout Button */}
              <div className="mt-6">
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;