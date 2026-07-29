export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  location: string;
}

const galleryModules = import.meta.glob("../../public/images/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const galleryData: GalleryItem[] = Object.entries(galleryModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "gallery-image";
    const title = fileName.replace(/\.[^.]+$/, "");
    const normalizedSrc = src.startsWith("/public/") ? src.replace("/public/", "/") : src;

    return {
      src: normalizedSrc,
      alt: `Gallery image ${title}`,
      title: title.replace(/-/g, " "),
      description: "",
      location: "",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));
