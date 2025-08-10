import { FC } from "react";
import { getImageUrl } from "../services/upload";

interface ImageDisplayProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const ImageDisplay: FC<ImageDisplayProps> = ({
  src,
  alt,
  className = "",
  fallbackSrc = "/placeholder-image.png",
}) => {
  const imageUrl = getImageUrl(src);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <img
      src={imageUrl || fallbackSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageDisplay;
