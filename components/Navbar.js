import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold hover:text-gray-400 ">
          Sakugaa 
        </Link>
        
        <ul className="flex space-x-6">
          <li>
            <Link href="/animations" className="hover:text-gray-400 transition">
              Animations
            </Link>
          </li>
          <li>
            <Link href="/artists" className="hover:text-gray-400 transition">
              Artists
            </Link>
          </li>
          <li>
            <Link href="/rank" className="hover:text-gray-400 transition">
              Rank
            </Link>
          </li>
          <li>
            <Link href="/community" className="hover:text-gray-400 transition">
              Community
            </Link>
          </li>
        </ul>
        
        <div className="flex space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition mt-2"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition mt-2"
          >
            Register
          </Link>
        </div>
        
      </div>
    </nav>
  );
}