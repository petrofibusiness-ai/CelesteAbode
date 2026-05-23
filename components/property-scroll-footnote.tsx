import type { ReactNode } from "react";

const scrollCopyBase = "block w-full min-w-0 max-w-none text-left";

export function PropertyScrollFootnote({ children }: { children: ReactNode }) {
  return (
    <p className={`property-scroll-footnote mt-6 ${scrollCopyBase} text-xs leading-relaxed text-gray-500`}>
      {children}
    </p>
  );
}

export function PropertyScrollSubtext({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`property-scroll-subtext ${scrollCopyBase} text-base leading-relaxed text-gray-600 ${className}`.trim()}>
      {children}
    </p>
  );
}
