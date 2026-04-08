import Login from '@/Components/AuthLoginReg/Login';
import Image from 'next/image';


export default function Home() {
  return (
    <div className="relative min-h-screen font-sans antialiased overflow-hidden">
      {/* Overlay Login Card */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
       <Login></Login>
      </div>

      {/* Background Skeleton Dashboard (Blurred) */}
      <div className="flex h-screen bg-[#f0f2f5] filter blur-[4px] select-none pointer-events-none">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 hidden lg:flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="w-32 h-6 bg-slate-200 rounded-md animate-pulse"></div>
          </div>
          <div className="p-4 space-y-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-20 h-3 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-full h-2 bg-slate-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="w-40 h-4 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </header>
          <div className="flex-1 p-10 space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="w-64 h-20 bg-slate-100 rounded-2xl"></div>
            </div>
            <div className="flex gap-4 justify-end">
              <div className="w-64 h-16 bg-[#3B5998]/10 rounded-2xl"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="w-80 h-24 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
