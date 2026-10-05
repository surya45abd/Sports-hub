import React, { useState } from "react";

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80";

export default function SafeImage({
  src,
  alt = "Sports photography",
  className = "w-full h-full object-cover",
  containerClassName = "relative overflow-hidden",
  fallbackSrc = DEFAULT_FALLBACK,
  credit = null,
  showCredit = true,
  loading = "lazy",
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync if src prop changes
  React.useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setHasError(false);
      setIsLoaded(false);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={containerClassName}>
      {/* Background skeleton/gradient shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-ink/10 via-line to-ink/5 animate-pulse" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />

      {credit && showCredit && isLoaded && (
        <figcaption className="absolute bottom-2.5 right-2.5 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono px-2 py-0.5 rounded shadow pointer-events-none">
          {credit}
        </figcaption>
      )}
    </div>
  );
}
