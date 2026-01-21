import Link from 'next/link';

export default function Navbar() {
  return (
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo avec effet plus subtil */}
            <Link
                href="/"
                className="text-xl font-bold text-white hover:text-blue-400 transition duration-200"
            >
              <span className="text-blue-400">S</span>akugaa
            </Link>

            {/* Navigation Links - Centré et épuré */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Clips', href: '/clips' },
                { name: 'Animations', href: '/animations' },
                { name: 'Artists', href: '/artists' },
                { name: 'Rank', href: '/rank' },
                { name: 'Community', href: '/community' },
              ].map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition duration-200 font-medium text-sm"
                  >
                    {item.name}
                  </Link>
              ))}
            </div>

            {/* Auth Buttons - Style moderne */}
            <div className="flex items-center gap-2">
              <Link
                  href="/search"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition"
                  aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              <div className="hidden sm:flex items-center gap-2">
                <Link
                    href="/login"
                    className="px-4 py-2 text-gray-300 hover:text-white transition font-medium text-sm"
                >
                  Sign in
                </Link>
                <Link
                    href="/register"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium text-sm"
                >
                  Join Free
                </Link>
              </div>

              {/* Menu mobile */}
              <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}