"use client"
import React, { useEffect, useState } from 'react'
import Header from '../dashboard/_components/Header'
import SideNav from '../dashboard/_components/SideNav'
import { UserDetailContext } from '../_context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import MobileMenu from '../dashboard/_components/MobileMenu'

const UpgradeLayout = ({children}) => {
  const [userDetail, setUserDetail] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    user && getUserDetails();
  }, [user])

  const getUserDetails = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    const result = await db.select().from(Users)
    .where(eq(Users.email, user.primaryEmailAddress.emailAddress));
    setUserDetail(result[0]);
  }
  
  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block h-screen fixed top-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-10 transition-all duration-300 ease-in-out`}>
            <SideNav />
        </div>
        <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 md:p-6 md:ml-64 transition-all duration-300">
              <div className="container mx-auto max-w-7xl">
                {children}
              </div>
            </main>
        </div>
      </div>
    </UserDetailContext.Provider>
  )
}

export default UpgradeLayout