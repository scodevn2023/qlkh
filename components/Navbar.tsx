import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <a href="/">Trang chủ</a>
        </div>
        <div>
          {session ? (
            <button onClick={() => signOut()}>Đăng xuất</button>
          ) : (
            <a href="/login">Đăng nhập</a>
          )}
        </div>
      </div>
    </nav>
  )
}
