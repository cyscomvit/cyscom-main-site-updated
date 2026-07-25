import { useRef, useState } from "react";

const SponsorCard = ({ name, description, image, website }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
    setIsHovered(false);
  };

  const CardWrapper = ({ children }) =>
    website ? (
      <a href={website} target="_blank" rel="noopener noreferrer" className="block size-full">
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  return (
    <div
      ref={cardRef}
      className="crypto-card group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:scale-105"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-sponsor-card
      style={{
        transitionProperty: "transform, border-color",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <CardWrapper>
        {/* Logo area */}
        <div className="relative flex items-center justify-center bg-white/5 h-36 md:h-44 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-indigo-900/60 to-black/80" />
          {/* Sponsor logo with eased loading */}
          <img
            src={image}
            alt={`${name} logo`}
            loading="lazy"
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.7s ease-in",
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              setImgLoaded(true);
            }}
            className="relative z-10 p-4 w-full h-full object-contain"
          />
          {/* Placeholder while loading */}
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
            </div>
          )}
        </div>
        {/* Info area */}
        <div className="p-4 md:p-5 bg-black/80 backdrop-blur-sm relative z-10">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <h3 className="crypto-title text-base md:text-lg font-black uppercase text-blue-100 mb-2 relative z-10">
            {name}
          </h3>
          <p className="font-circular-web text-xs md:text-sm leading-relaxed text-blue-50/60 relative z-10">
            {description}
          </p>
          {/* Status dot */}
          <div className="flex items-center space-x-2 mt-3 font-general text-xs relative z-10">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isHovered ? "bg-blue-400 animate-pulse" : "bg-blue-400/60"
              }`}
            />
            <span className="text-blue-400/70">PARTNER</span>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};

export default SponsorCard;
