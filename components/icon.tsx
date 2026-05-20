import type { ElementType } from "react";

interface IconProps {
  icon: ElementType;
  size?: number;
  className?: string;
}

const Icon = ({ icon: RadixIcon, size = 20, className }: IconProps) => (
  <RadixIcon width={size} height={size} className={className} />
);

export default Icon;
