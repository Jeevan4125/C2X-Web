import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Button.module.scss";
import { cn } from "@/utils/helpers";
import { buttonTap } from "@/animations/motion";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: undefined;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/**
 * Universal action button. Renders as a native <button>, an internal
 * <Link>, or an external <a> depending on which props are supplied.
 */
const Button = (props: ButtonProps): React.ReactElement => {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    icon,
    iconPosition = "left",
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    styles.btn,
    styles[variant],
    size !== "md" && styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </>
  );

  // Handle internal navigation (React Router Link)
  if ("to" in props && props.to) {
    const { to, ...linkRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        to: string;
      };
    return (
      <motion.div
        whileTap={buttonTap}
        className="inline-flex"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Link to={to} className={classes} {...(linkRest as any)}>
          {content}
        </Link>
      </motion.div>
    );
  }

  // Handle external links
  if ("href" in props && props.href) {
    const { href, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
    return (
      <motion.div
        whileTap={buttonTap}
        className="inline-flex"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      </motion.div>
    );
  }

  // Handle regular button
  return (
    <motion.button
      whileTap={buttonTap}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={classes}
      {...(rest as Record<string, unknown>)}
    >
      {content}
    </motion.button>
  );
};

export default Button;
