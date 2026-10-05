import { motion } from "framer-motion";
import {
  Users,
  GitBranch,
  MessageSquare,
  Eye,
  Share2,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  ListTodo,
} from "lucide-react";
import styles from "./Collaboration.module.scss";
import { fadeUp } from "@/animations/motion";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import CollabEditorMockup from "@/components/collaboration/CollabEditorMockup";
import type { CollabFeature } from "@/types";

const features: CollabFeature[] = [
  {
    id: "live",
    icon: Users,
    title: "Live Multiplayer Editing",
    description:
      "Multiple developers can edit the same file simultaneously with low-latency Operational Transform sync, live cursors, and active line highlights.",
  },
  {
    id: "workspace",
    icon: GitBranch,
    title: "Shared Team Workspace",
    description:
      "A unified cloud development workspace where your entire team shares code files, active terminals, and environment variables safely.",
  },
  {
    id: "presence",
    icon: Eye,
    title: "Presence & Cursor Tracking",
    description:
      "Know who is online, which file they have open, where their cursor is positioned, and jump directly to their active view with Follow Mode.",
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Instant Room Sharing",
    description:
      "Generate secure invite codes and join links to bring teammates directly into your active coding session in seconds.",
  },
  {
    id: "comments",
    icon: MessageSquare,
    title: "In-Editor Chat & Comments",
    description:
      "Discuss code snippets, attach comment pins to specific lines, and review logic directly within the editing panel without external chat apps.",
  },
  {
    id: "invite",
    icon: UserPlus,
    title: "Granular Member Access",
    description:
      "Manage room invitations with role-based access controls to protect production files while granting edit access to active contributors.",
  },
];

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Create Collaboration Room",
    description:
      "Click 'Share Session' from the top bar to initialize a real-time multiplayer workspace session.",
  },
  {
    step: 2,
    title: "Invite Teammates",
    description:
      "Copy the 6-digit room code or secure invitation URL and send it to your team or pair partner.",
  },
  {
    step: 3,
    title: "Join Workspace",
    description:
      "Teammates join instantly with active user avatars displaying in the status bar.",
  },
  {
    step: 4,
    title: "Collaborate Live",
    description:
      "Edit code together with live cursor tracking, shared selections, and side-by-side terminal output.",
  },
  {
    step: 5,
    title: "Review Changes",
    description:
      "Inspect live diffs, resolve conflicts together, and leave line-specific comments.",
  },
  {
    step: 6,
    title: "Complete Tasks",
    description:
      "Mark workspace task board items complete and commit verified changes directly to Git.",
  },
];

const COLLAB_FAQS = [
  {
    q: "How many developers can edit code together in a single session?",
    a: "C2X supports up to 20 concurrent editors per workspace session with sub-50ms synchronization latency.",
  },
  {
    q: "Can collaborators access my local terminal commands?",
    a: "Terminal sharing is optional and explicitly permissions-controlled. Owners can grant read-only or full execution access to shared terminals.",
  },
  {
    q: "How do workspace permissions work?",
    a: "Owners hold administrative rights, Editors can write code and run approved terminals, and Viewers can inspect files and leave comments.",
  },
  {
    q: "Is collaborative editing encrypted?",
    a: "Yes. All operational transform edits, presence packets, and chat messages are encrypted in transit using TLS 1.3 and WebSockets.",
  },
];

const Collaboration = (): React.ReactElement => {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Collaboration"
        title="Build together, in real time."
        description="C2X transforms how teams code together — live cursors, shared terminals, and instant collaboration without leaving your editor."
      >
        <div className={styles.heroImageWrap}>
          <img
            src="/images/collaboration/IMG-20260809-WA0011.jpg"
            alt="C2X collaboration workspace showing room creation, live cursors, team chat, task board, and presence indicators"
            className={styles.heroImage}
            loading="lazy"
          />
        </div>
      </PageHero>

      {/* Main Features */}
      <section className="section-pad">
        <Container>
          <SectionTitle
            eyebrow="Features"
            title="Designed for effortless teamwork"
            description="Every collaboration feature is built to keep your team aligned, productive, and focused."
          />
          <div className={styles.grid}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  id={feature.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i % 3}
                  className={styles.card}
                >
                  <div className={styles.icon}>
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Permissions & Roles */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Permissions"
            title="Role-based workspace access"
            description="Control exactly who can edit code, run terminal commands, and modify settings."
          />
          <div className={styles.rolesGrid}>
            <div className={styles.roleCard}>
              <h3>Owner</h3>
              <p>Full administrative authority over room settings, permissions, and session termination.</p>
              <ul>
                <li><CheckCircle2 size={16} className="text-accent" /> Manage workspace access & roles</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Full read, write & execution rights</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Configure shared secrets & environment</li>
              </ul>
            </div>
            <div className={styles.roleCard}>
              <h3>Editor</h3>
              <p>Active contributor privilege for pair programming and team sprint execution.</p>
              <ul>
                <li><CheckCircle2 size={16} className="text-accent" /> Edit all project files live</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Execute terminal commands</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Use AI assistant & shared chat</li>
              </ul>
            </div>
            <div className={styles.roleCard}>
              <h3>Viewer</h3>
              <p>Read-only access designed for code walkthroughs, reviews, and educational demos.</p>
              <ul>
                <li><CheckCircle2 size={16} className="text-accent" /> View files and follow active cursors</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Leave comments & feedback pins</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Inspect terminal output safely</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Collaboration Room Workflow */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Workflow"
            title="How collaboration rooms work"
            description="Six steps from room creation to task completion."
          />
          <div className={styles.workflowTimeline}>
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.step} className={styles.workflowStep}>
                <span className={styles.stepBadge}>{step.step}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          {/* Live Pair Programming Editor Mockup */}
          <CollabEditorMockup />
        </Container>
      </section>

      {/* Use Cases */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Use Cases"
            title="Empowering collaborative development"
            description="See how teams leverage C2X collaboration in practice."
          />
          <div className={styles.useCasesGrid}>
            <div className={styles.useCaseCard}>
              <h3>Remote Pair Programming</h3>
              <p>Senior and junior engineers code side-by-side with live audio and cursor sharing to debug issues fast.</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>Hackathons & Rapid Sprints</h3>
              <p>Teammates split up frontend and backend files, coding concurrently without git merge friction.</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>Interactive Code Reviews</h3>
              <p>Reviewers jump directly into active workspaces to highlight edge cases and test refactors in real time.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Collaboration FAQ"
            description="Frequently asked questions about real-time session mechanics."
          />
          <div className={styles.faqList}>
            {COLLAB_FAQS.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Collaboration;
