/** Section title: "{Project Name}'s Project Gallery" */
export function formatProjectGalleryHeading(projectName: string): string {
  const name = projectName
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return name ? `${name}'s Project Gallery` : "Project Gallery";
}
