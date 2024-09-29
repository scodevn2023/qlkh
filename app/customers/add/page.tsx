'use client';

import React from 'react';
import AddCustomerForm from '../../../components/AddCustomerForm';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const AddCustomerPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Quay lại
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Thêm khách hàng mới</h1>
      <AddCustomerForm />
    </div>
  );
};

export default AddCustomerPage;
