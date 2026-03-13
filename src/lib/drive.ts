/**
 * Extracts the file ID from a standard Google Drive share link.
 * Handles forms like:
 * - https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
 * - https://drive.google.com/open?id={FILE_ID}
 * - /api/drive/{FILE_ID} (local proxy — returned as-is)
 * If just an ID is passed, it returns it.
 */
function extractFileId(urlOrId: string): string {
  // If it's a local proxy path, return the file ID portion
  if (urlOrId.startsWith("/api/drive/")) {
    return urlOrId.replace("/api/drive/", "");
  }

  if (!urlOrId.includes("http") && !urlOrId.includes("/")) return urlOrId;
  
  const matchD = urlOrId.match(new RegExp("/file/d/([a-zA-Z0-9_-]+)"));
  if (matchD && matchD[1]) return matchD[1];

  const matchId = urlOrId.match(/id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) return matchId[1];

  return urlOrId; // Fallback
}

export function getDriveVideoEmbedUrl(urlOrId: string) {
  if (!urlOrId || urlOrId.includes("placeholder")) return "";
  // If the URL is already a full preview embed, return it directly
  if (urlOrId.includes("/preview")) return urlOrId;
  const fileId = extractFileId(urlOrId);
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveImageEmbedUrl(urlOrId: string) {
  if (!urlOrId || urlOrId.includes("placeholder")) return "";
  // If it's already a local API proxy path, use it directly — no wrapping
  if (urlOrId.startsWith("/api/drive/")) return urlOrId;
  const fileId = extractFileId(urlOrId);
  return `/api/drive/${fileId}`;
}

