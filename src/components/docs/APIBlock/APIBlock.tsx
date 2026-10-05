import { useState } from "react";
import styles from "./APIBlock.module.scss";
import { cn } from "@/utils/helpers";
import EndpointCard, { type HttpMethod } from "@/components/docs/EndpointCard";
import CodeBlock from "@/components/docs/CodeBlock";

export interface APIErrorCode {
  code: string;
  status: number;
  meaning: string;
}

interface APIBlockProps {
  method: HttpMethod;
  path: string;
  summary: string;
  requestLanguage?: string;
  request: string;
  responseLanguage?: string;
  response: string;
  errors?: APIErrorCode[];
}

type Tab = "request" | "response" | "errors";

/**
 * Full endpoint reference block: method/path header, then tabbed
 * Request / Response / Error Codes panes. Used throughout the API docs.
 */
const APIBlock = ({
  method,
  path,
  summary,
  requestLanguage = "json",
  request,
  responseLanguage = "json",
  response,
  errors,
}: APIBlockProps): React.ReactElement => {
  const [tab, setTab] = useState<Tab>("request");
  const tabs: Tab[] = errors && errors.length > 0 ? ["request", "response", "errors"] : ["request", "response"];

  return (
    <div className={styles.block}>
      <EndpointCard method={method} path={path} summary={summary} />

      <div className={styles.tabs} role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={cn(styles.tab, tab === t && styles.activeTab)}
            onClick={() => setTab(t)}
          >
            {t === "request" ? "Request" : t === "response" ? "Response" : "Error Codes"}
          </button>
        ))}
      </div>

      {tab === "request" && <CodeBlock language={requestLanguage} filename="Request" code={request} />}
      {tab === "response" && <CodeBlock language={responseLanguage} filename="Response" code={response} />}
      {tab === "errors" && errors && (
        <div className={styles.errorTable}>
          <div className={styles.errorHeader}>
            <span>Code</span>
            <span>Status</span>
            <span>Meaning</span>
          </div>
          {errors.map((err) => (
            <div key={err.code} className={styles.errorRow}>
              <code>{err.code}</code>
              <span className={styles.status}>{err.status}</span>
              <span>{err.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default APIBlock;
