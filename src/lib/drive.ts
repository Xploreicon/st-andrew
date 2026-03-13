/**
 * Extracts the file ID from a standard Google Drive share link.
 * Handles forms like:
 * - https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
 * - https://drive.google.com/open?id={FILE_ID}
 * If just an ID is passed, it returns it.
 */
function extractFileId(urlOrId: string): string {
  if (!urlOrId.includes("http") && !urlOrId.includes("/")) return urlOrId;
  
  const matchD = urlOrId.match(new RegExp("/file/d/([a-zA-Z0-9_-]+)"));
  if (matchD && matchD[1]) return matchD[1];

  const matchId = urlOrId.match(/id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) return matchId[1];

  return urlOrId; // Fallback
}

export function getDriveVideoEmbedUrl(urlOrId: string) {
  if (!urlOrId || urlOrId.includes("placeholder")) return ""; // Ignore placeholders for now
  const fileId = extractFileId(urlOrId);
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveImageEmbedUrl(urlOrId: string) {
  if (!urlOrId || urlOrId.includes("placeholder")) return ""; // Ignore placeholders for now
  const fileId = extractFileId(urlOrId);
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
