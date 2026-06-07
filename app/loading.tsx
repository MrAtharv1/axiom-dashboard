export default function Loading() {
  return (
    <div className="flex min-h-screen bg-void-950">
      {/* Sidebar skeleton */}
      <aside className="hidden lg:flex flex-col w-[72px] min-h-screen border-r border-white/[0.04] bg-void-900 px-3 py-6 gap-4">
        <div className="w-10 h-10 rounded-xl skeleton mx-auto" />
        <div className="mt-4 flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-xl skeleton mx-auto" />
          ))}
        </div>
      </aside>

      {/* Main skeleton */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="w-24 h-3 rounded skeleton mb-3" />
            <div className="w-64 h-8 rounded-lg skeleton mb-2" />
            <div className="w-40 h-4 rounded skeleton" />
          </div>
          <div className="w-32 h-10 rounded-xl skeleton" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl skeleton" />
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-52 rounded-3xl skeleton" />
          <div className="h-52 rounded-3xl skeleton" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 rounded-3xl skeleton" />
          ))}
        </div>
      </main>
    </div>
  );
}
