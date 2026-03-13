export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail?: string;             // Static thumbnail for card preview
  driveVideoUrl: string;          // Google Drive share link or ID
  driveGifUrls: string[];         // Google Drive share links or IDs for GIFs
  styleframeUrls: string[];       // Google Drive share links or IDs for styleframes
};

export const projects: Project[] = [
  {
    id: "waffles-waitlist",
    title: "Waffles Waitlist Launch",
    category: "Product Launch",
    description: "A waitlist launch video for the Waffles app. Includes styleframes and GIF breakdowns.",
    thumbnail: "/api/drive/1tvx55egY_0RFC-XdtGM_STbFUl9UXAZ2",
    driveVideoUrl: "https://drive.google.com/file/d/122-1QaKjfDjJDi1ZP1s9qpxSrPmYmZ5T/preview",
    driveGifUrls: [
      "/api/drive/14QWl2r-VrHZiX3SIteiMyZzPuqW6jo_1",
      "/api/drive/1KErQs3rwrT0heiuVq9JhE6gZPLVUmR5X",
      "/api/drive/13lTmbkO2MWFzg0amBpE9A_oQpJZLSCk3",
      "/api/drive/1ZgTb2nRC02_fpS3zpQ7Em2aANi3eH3-d"
    ],
    styleframeUrls: [
      "/api/drive/1tvx55egY_0RFC-XdtGM_STbFUl9UXAZ2",
      "/api/drive/1SSirUjVzANuTUo1y_06Q0nsL09Zb2Ub-",
      "/api/drive/1GUgMIY4Z58fK7JP988nsIfYffUw2300K",
      "/api/drive/1R0qmzg05sp9PIdWz8XkF6UK_qzADMAwn"
    ]
  },
  {
    id: "waffles-launch",
    title: "Waffles Launch Video",
    category: "Brand Video",
    description: "Full launch video for Waffles.",
    driveVideoUrl: "https://drive.google.com/file/d/1GmVrlELTalLTLineV7s0_OK42Zp28Qvu/preview",
    driveGifUrls: [],
    styleframeUrls: []
  },
  {
    id: "finna",
    title: "Finna",
    category: "Collab",
    description: "Collaborative motion design project for Finna.",
    driveVideoUrl: "https://drive.google.com/file/d/1woE833bAIHdsZsdaECsALR88nrL8cBbl/preview",
    driveGifUrls: [],
    styleframeUrls: []
  },
  {
    id: "prodigy-fi",
    title: "Prodigy Fi",
    category: "Collab",
    description: "Collaborative motion design project for Prodigy Fi.",
    driveVideoUrl: "https://drive.google.com/file/d/1HLQtppGSPXxy0WJ-XfuygveJlYgEro98/preview",
    driveGifUrls: [],
    styleframeUrls: []
  }
];
