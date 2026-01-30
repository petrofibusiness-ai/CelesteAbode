import { Header } from "@/components/header";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero skeleton */}
        <div className="relative h-[75vh] min-h-[480px] max-h-[840px] bg-gray-200 animate-pulse" />
        <div className="h-6 md:h-8 bg-background" />

        {/* Content area skeleton - 3 column layout */}
        <div className="max-w-[95%] xl:max-w-[1800px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left sidebar skeleton */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-12 w-12 rounded bg-gray-200 animate-pulse shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Center content skeleton */}
            <div className="lg:col-span-6 space-y-8">
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
              <div className="h-32 w-full bg-gray-100 rounded-xl animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>

            {/* Right sidebar skeleton */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 rounded-xl bg-gray-100 p-6 animate-pulse">
                <div className="h-6 w-36 bg-gray-200 rounded mb-6" />
                <div className="space-y-4">
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                </div>
                <div className="h-11 w-full bg-gray-200 rounded-lg mt-6" />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
