const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "";

const imgSrc = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}${path}`;
};

export default imgSrc;