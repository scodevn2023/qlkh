'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUsers, FaBoxes, FaHistory } from 'react-icons/fa';

export function HomeContent() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-600">Chào mừng bạn!</h1>
          <p className="mb-8 text-gray-600">Vui lòng đăng nhập để tiếp tục.</p>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-grow p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Tổng quan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <DashboardCard
            title="Khách hàng"
            count={0}
            icon={<FaUsers className="w-8 h-8 text-blue-500" />}
            link="/customers"
          />
          <DashboardCard
            title="Sản phẩm"
            count={0}
            icon={<FaBoxes className="w-8 h-8 text-green-500" />}
            link="/products"
          />
          <DashboardCard
            title="Lịch sử mua hàng gần đây"
            content="Chưa có dữ liệu"
            icon={<FaHistory className="w-8 h-8 text-purple-500" />}
            link="/purchase-history"
          />
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  count?: number;
  content?: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, content, icon, link }) => (
  <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {icon}
      </div>
      {count !== undefined ? (
        <p className="text-3xl font-bold text-gray-700">{count}</p>
      ) : (
        <p className="text-gray-600">{content}</p>
      )}
    </div>
    <Link href={link} className="text-blue-600 hover:text-blue-800 mt-4 inline-block transition-colors">
      Xem chi tiết
    </Link>
  </div>
);
