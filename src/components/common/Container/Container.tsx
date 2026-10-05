import type { ReactNode, ElementType } from "react";
import { cn } from "@/utils/helpers";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Centralized responsive width constraint used across every section
 * of the site to keep horizontal rhythm consistent.
 */
const Container = ({ children, className, as: Tag = "div" }: ContainerProps): React.ReactElement => {
  return <Tag className={cn("container-app", className)}>{children}</Tag>;
};

export default Container;
