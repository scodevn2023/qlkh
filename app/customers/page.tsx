'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Customer {
  _id: string;
  name: string;
  phone: string;
  address: string;
  potentialLevel: number;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý khách hàng</h1>
      <Link href="/customers/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mb-4">
        <FaUserPlus className="mr-2" />
        Thêm khách hàng mới
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tên</th>
            <th className="py-2 px-4 border-b">Số điện thoại</th>
            <th className="py-2 px-4 border-b">Địa chỉ</th>
            <th className="py-2 px-4 border-b">Mức độ tiềm năng</th>
            <th className="py-2 px-4 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.phone}</td>
              <td className="py-2 px-4 border-b">{customer.address}</td>
              <td className="py-2 px-4 border-b">{customer.potentialLevel}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/customers/edit/${customer._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaEdit />
                </Link>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;

