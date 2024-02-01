import { vevgWasteTypeDescriptions } from "../../vevg.config";

/**
 * Get tags for the best matching title based on a mapping table.
 * @param title
 */
export const getProperTags = (title: string): string[] | null => {
  // get name from vevgWasteTypeDescriptions if all items in swords are included in title
  const properWasteTypeDescription = vevgWasteTypeDescriptions.find(
    (wasteTypeDescription) => {
      return wasteTypeDescription.swords.every((sword) => {
        // case insensitive
        return title.toLowerCase().includes(sword.toLowerCase());
      });
    }
  );
  return properWasteTypeDescription?.tags || null;
};
