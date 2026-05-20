import type { ComponentType } from "react";

type RadixIconComponent = ComponentType<{ className?: string }>;

interface IconProps {
  icon: RadixIconComponent;
  size?: number;
  className?: string;
}

const Icon = ({ icon: RadixIcon, size = 20, className }: IconProps) => (
  <RadixIcon
    className={className}
    style={{ width: size, height: size }}
  />
);

export default Icon;
