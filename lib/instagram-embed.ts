export function processInstagramEmbeds() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { instgrm?: { Embeds?: { process: () => void } } };
  w.instgrm?.Embeds?.process();
}
