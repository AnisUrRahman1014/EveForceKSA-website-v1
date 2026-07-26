import { XOutlined, InstagramFilled, FacebookFilled, LinkedinFilled, YoutubeFilled } from "@ant-design/icons";

export type SocialPlatform = "x" | "instagram" | "facebook" | "linkedin" | "youtube" | "vimeo";

const VimeoGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M22.4 7.1c-.1 2.2-1.6 5.2-4.6 9-3.1 4-5.7 6-7.8 6-1.3 0-2.4-1.2-3.3-3.6C5.8 15.4 5 12 3.9 10.9c-.2-.2-1-.1-2.2.7L.7 10.4c1.4-1.2 2.8-2.5 4.1-3.7C6.6 5.2 7.9 4.3 8.7 4.2c2-.2 3.2 1.2 3.6 4.1.5 3.2 1 4.9 1.5 5.2.5.2 1.4-.9 2.7-3.3 1.2-2.4 1-4.1-.6-5.2-.6-.4-1.7-.2-3.2.6 1-3.4 3-5 5.9-4.9 2.2.1 3.2 1.5 3.2 4.4Z" />
  </svg>
);

const PLATFORM_META: Record<
  SocialPlatform,
  { icon: React.ReactNode; bg: string; shape: "round" | "square" }
> = {
  x: { icon: <XOutlined />, bg: "#000000", shape: "square" },
  instagram: {
    icon: <InstagramFilled />,
    bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    shape: "square",
  },
  facebook: { icon: <FacebookFilled />, bg: "#1877F2", shape: "round" },
  linkedin: { icon: <LinkedinFilled />, bg: "#0A66C2", shape: "square" },
  youtube: { icon: <YoutubeFilled />, bg: "#FF0000", shape: "square" },
  vimeo: { icon: <VimeoGlyph />, bg: "#1AB7EA", shape: "round" },
};

interface SocialIconProps {
  platform: SocialPlatform;
  size?: number;
}

const SocialIcon = ({ platform, size = 36 }: SocialIconProps) => {
  const meta = PLATFORM_META[platform];
  return (
    <span
      className={`social-icon social-icon--${meta.shape}`}
      style={{
        width: size,
        height: size,
        background: meta.bg,
      }}
    >
      {meta.icon}
    </span>
  );
};

export default SocialIcon;
