'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FaHome, FaUsers, FaBoxes, FaHistory, FaChartBar, FaCog, FaSignOutAlt, FaUserPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface NavigationProps {
  children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const { data: session, status } = useSession();

  const navItems = [
    { icon: FaHome, text: 'Trang chủ', href: '/' },
    { icon: FaUsers, text: 'Khách hàng', href: '/customers' },
    { icon: FaBoxes, text: 'Sản phẩm', href: '/products' },
    { icon: FaHistory, text: 'Lịch sử mua hàng', href: '/purchase-history' },
    { icon: FaChartBar, text: 'Báo cáo', href: '/reports' },
    { icon: FaCog, text: 'Cài đặt', href: '/settings' },
  ];

  if (session?.user?.role === 'admin') {
    navItems.push({ icon: FaUserPlus, text: 'Quản lý người dùng', href: '/users' });
  }

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push('/login');
  }, [router]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <nav className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-80 max-h-screen overflow-y-auto bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50 flex flex-col`}>
        {/* ... (rest of the navigation code remains the same) ... */}
      </nav>

      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className={`flex-1 transition-margin duration-300 ease-in-out ${isOpen ? 'ml-80' : 'ml-0'}`}>
        <header className="bg-white shadow-sm">
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navigation;
