import styles from "./CommandCard.module.scss";
import CodeBlock from "@/components/docs/CodeBlock";

export interface CommandArg {
  flag: string;
  description: string;
}

interface CommandCardProps {
  command: string;
  description: string;
  args?: CommandArg[];
  example: string;
  output?: string;
}

/** Reference card for a single CLI command: signature, arguments, example, and sample output. */
const CommandCard = ({ command, description, args, example, output }: CommandCardProps): React.ReactElement => {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <code className={styles.command}>{command}</code>
      </div>
      <p className={styles.description}>{description}</p>

      {args && args.length > 0 && (
        <div className={styles.args}>
          {args.map((arg) => (
            <div key={arg.flag} className={styles.argRow}>
              <code className={styles.flag}>{arg.flag}</code>
              <span className={styles.argDesc}>{arg.description}</span>
            </div>
          ))}
        </div>
      )}

      <CodeBlock language="bash" filename="Terminal" code={example} />

      {output && (
        <div className={styles.outputWrap}>
          <span className={styles.outputLabel}>Output</span>
          <CodeBlock language="text" code={output} />
        </div>
      )}
    </div>
  );
};

export default CommandCard;
