import type { ReactNode } from "react";
import styles from "./EndpointCard.module.scss";
import { cn } from "@/utils/helpers";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface EndpointCardProps {
  method: HttpMethod;
  path: string;
  summary: string;
  children?: ReactNode;
}

const METHOD_CLASS: Record<HttpMethod, string> = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

/** Endpoint header row (method badge + path + one-line summary) used atop an APIBlock. */
const EndpointCard = ({ method, path, summary, children }: EndpointCardProps): React.ReactElement => {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={cn(styles.method, styles[METHOD_CLASS[method]])}>{method}</span>
        <code className={styles.path}>{path}</code>
      </div>
      <p className={styles.summary}>{summary}</p>
      {children}
    </div>
  );
};

export default EndpointCard;
