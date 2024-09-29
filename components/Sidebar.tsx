import { useSession } from 'next-auth/react'

export default function Sidebar() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <aside className="bg-gray-200 w-64 p-4">
      <ul>
        <li><a href="/customers">Quản lý khách hàng</a></li>
        <li><a href="/products">Quản lý sản phẩm</a></li>
        <li><a href="/sales">Quản lý lịch sử mua hàng</a></li>
        {session.user.role === 'admin' && (
          <li><a href="/admin">Quản lý hệ thống</a></li>
        )}
      </ul>
    </aside>
  )
}
