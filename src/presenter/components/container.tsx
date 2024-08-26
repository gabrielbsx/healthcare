import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={twMerge("container mx-auto px-4", className)} {...props}>
      {children}
    </div>
  );
}

export default Container;
