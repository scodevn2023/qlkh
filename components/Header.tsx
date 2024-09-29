'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaSearch } from 'react-icons/fa';

const Header = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FaBars className="w-6 h-6" />
            </button>
            <Link href="/" className="text-xl font-bold">
            
            </Link>
          </div>
  {/* N-Bar */}
          {session && (
            <>
              

              <div className="flex items-center gap-2">
                <button className="lg:hidden">
                  <FaSearch className="w-6 h-6" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 hover:text-blue-200"
                  >
                    <span className="hidden text-right lg:block">
                      <span className="block text-xs font-medium">
                        {session.user?.name}
                      </span>
                    </span>
                    <Image
                      width={32}
                      height={32}
                      src="/images/user/user-01.png"
                      alt="User"
                      className="rounded-full"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Hồ sơ
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Cài đặt
                      </Link>
                      <button 
                        onClick={() => signOut()} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-700 py-2">
          {/* Add your mobile menu items here */}
        </div>
      )}
    </header>
  );
};

export default Header;
