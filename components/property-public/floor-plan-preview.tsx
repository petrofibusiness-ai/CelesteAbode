export function FloorPlanPreview({ variant }: { variant: number }) {
  const rotations = ["rotate-0", "rotate-[0.5deg]", "-rotate-[0.5deg]"] as const;
  return (
    <div className={`absolute inset-0 ${rotations[variant % 3]}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f3efe6] via-[#e5dfd2] to-[#d8d0c0]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(138,115,64,0.12) 12px, rgba(138,115,64,0.12) 13px), repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(138,115,64,0.08) 12px, rgba(138,115,64,0.08) 13px)",
        }}
      />
      <div className="absolute inset-[10%] rounded-md border border-[#8a7340]/25 bg-white/50 shadow-inner" />
      <div className="absolute left-[16%] top-[20%] h-[40%] w-[26%] rounded-sm border border-[#CBB27A]/20 bg-white/55 shadow-sm" />
      <div className="absolute right-[14%] top-[22%] h-[36%] w-[28%] rounded-sm border border-[#CBB27A]/20 bg-white/50 shadow-sm" />
      <div className="absolute bottom-[16%] left-[12%] right-[12%] h-[24%] rounded-sm border border-[#8a7340]/15 bg-white/40" />
      <div className="absolute left-1/2 top-[48%] h-[8%] w-[6%] -translate-x-1/2 rounded-full bg-[#CBB27A]/15" />
    </div>
  );
}
