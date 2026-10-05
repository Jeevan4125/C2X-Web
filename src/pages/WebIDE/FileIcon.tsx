import React from "react";
import { FileCode } from "lucide-react";

interface FileIconProps {
  fileName: string;
  size?: number;
}

export const FileIcon: React.FC<FileIconProps> = ({ fileName, size = 16 }) => {
  const lower = fileName.toLowerCase();
  const ext = lower.split(".").pop() || "";

  // Special filenames
  if (lower === "package.json" || lower === "package-lock.json") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 3h18v18H3V3z" fill="#CB3837" />
        <path d="M6 7h12v10H6V7zm2 2v6h8V9H8z" fill="#FFF" />
      </svg>
    );
  }
  if (lower === "tsconfig.json" || lower === "jsconfig.json") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h18v18H3V3z" fill="#3178C6" />
        <path d="M7 12h10M12 7v10" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (lower === "dockerfile" || lower.startsWith("docker-compose")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#2496ED" />
      </svg>
    );
  }
  if (lower === ".gitignore" || lower === ".gitattributes") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12l-10-10-10 10 10 10 10-10z" fill="#F05032" />
        <path d="M12 6v12m-3-9h6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Extensions
  switch (ext) {
    case "tsx":
    case "jsx":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
        </svg>
      );
    case "ts":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path d="M7 17V7h2l3 5 3-5h2v10h-2v-6l-2 3.5h-2L11 11v6H7z" fill="#FFF" />
        </svg>
      );
    case "js":
    case "mjs":
    case "cjs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path d="M14 17c.5.8 1.2 1.3 2.2 1.3 1.2 0 2-.6 2-1.5 0-1-.8-1.4-2.2-2-1.5-.7-3.5-1.5-3.5-3.8 0-2 1.7-3.5 4.3-3.5 1.8 0 3 .7 3.7 1.8l-1.5 1c-.4-.6-1.1-1-2.2-1-1 0-1.7.5-1.7 1.3 0 .9.6 1.3 2.1 2 1.8.8 3.6 1.6 3.6 4s-1.8 3.8-4.6 3.8c-2.2 0-3.6-1-4.3-2.2l1.4-.9zM7 7h2v10H7V7z" fill="#000" />
        </svg>
      );
    case "py":
    case "pyw":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9 2C7.5 2 7 3.9 7 6v2h5v1H6c-3 0-5 1.5-5 5s2 5 5 5h2v-3c0-2 1.5-3 3-3h4c1.5 0 3-1 3-3V6c0-2.1-.5-4-4.9-4h-2.1zm-3.5 2.5a1 1 0 110 2 1 1 0 010-2z" fill="#3572A5" />
          <path d="M12.1 22c4.4 0 4.9-1.9 4.9-4v-2h-5v-1h6c3 0 5-1.5 5-5s-2-5-5-5h-2v3c0 2-1.5 3-3 3h-4c-1.5 0-3 1-3 3v4c0 2.1.5 4 4.9 4h2.1zm3.5-2.5a1 1 0 110-2 1 1 0 010 2z" fill="#FFD43B" />
        </svg>
      );
    case "java":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 3 5 3 5s3 2 3 5c0 3-3 5-3 5s4 3 9 3 9-3 9-3-3-2-3-5c0-3 3-5 3-5s-3.5-3-9-3zm0 18c-4.4 0-8-1.5-8-3s3.6-3 8-3 8 1.5 8 3-3.6 3-8 3z" fill="#B07219" />
        </svg>
      );
    case "html":
    case "htm":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2l2.3 16.5L12 21l6.7-2.5L21 2H3zm15.2 4.5l-.2 2.5H8.2l.2 2.5h9.4l-.8 8.5L12 19.8l-5-.8-.4-4.5h2.5l.2 2.3 2.7.5 2.7-.5.3-3.2H8.3L7.7 6.5h10.5z" fill="#E34F26" />
        </svg>
      );
    case "css":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2l2.3 16.5L12 21l6.7-2.5L21 2H3zm15.2 4.5l-.2 2.5H8.2l.2 2.5h9.4l-.8 8.5L12 19.8l-5-.8-.4-4.5h2.5l.2 2.3 2.7.5 2.7-.5.3-3.2H8.3L7.7 6.5h10.5z" fill="#264DE4" />
        </svg>
      );
    case "scss":
    case "sass":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#CC6699" />
        </svg>
      );
    case "json":
    case "jsonc":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4h3v2H7v4h1v2H7v4h1v2H5V4zm14 0h-3v2h1v4h-1v2h1v4h-1v2h3V4z" fill="#CBCB41" />
        </svg>
      );
    case "md":
    case "mdx":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="16" x="2" y="4" rx="2" fill="#42A5F5" />
          <path d="M6 15V9h2l2 3 2-3h2v6h-2v-3.5L10 14l-2-2.5V15H6z" fill="#FFF" />
        </svg>
      );
    case "sql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#E38C00" />
          <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#E38C00" strokeWidth="2" fill="none" />
          <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="#E38C00" strokeWidth="2" fill="none" />
        </svg>
      );
    default:
      return <FileCode size={size} style={{ color: "#858585" }} />;
  }
};
