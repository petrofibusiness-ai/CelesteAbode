import { HomepageAboutPanelBody } from "@/components/homepage-about-panel-body";

/**
 * Homepage SEO: full article stack stays in HTML (hidden) for crawlers; visible UX is the side panel opened from metrics.
 */
export function HomepageSeoBlocks() {
  return (
    <section className="hidden" aria-hidden="true">
      <HomepageAboutPanelBody />
    </section>
  );
}
