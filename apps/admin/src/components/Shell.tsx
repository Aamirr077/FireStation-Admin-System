"use client";

export default function Shell({
  title,
  right,
  tabs,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  tabs?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full">
      {/* Sticky Header */}
      <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-10 w-full shrink-0">
        {/* ✅ px-6 (24px) or px-8 (32px) is the sweet spot for Studio clones */}
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-[24px] font-semibold text-[#0d0d0d] tracking-tight">{title}</h1>
            {right}
          </div>
          {tabs ? <div className="mt-4">{tabs}</div> : <div className="h-4" />}
        </div>
      </header>

      {/* ✅ Reduced padding here from px-8 to px-6 to bring content closer */}
      <div className="px-4 py-6">
        {children}
      </div>
    </div>
  );
}