export const getImageUrl = (
  path: string | null,
  size: "w500" | "original" = "w500"
) => {
  if (!path) return "/placeholder.jpg";
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
