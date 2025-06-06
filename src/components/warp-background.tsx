import { Warp, type WarpProps } from "@paper-design/shaders-react";

interface WarpBackgroundProps extends WarpProps {
  imageUrl?: string;
}

export default function WarpBackground(props: WarpBackgroundProps) {
  const { imageUrl, ...rest } = props;

  const warpProps = {
    // speed: 0.4,
    // rotation: 0.5,
    style: { width: "100%", height: "100%", position: "relative" },
    ...rest,
  };

  return (
    <Warp
      {...warpProps}
      style={{ ...warpProps.style, ...props.style } as React.CSSProperties}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            opacity: 0.85,
          }}
        />
      )}
    </Warp>
  );
}
