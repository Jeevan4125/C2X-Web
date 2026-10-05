import { motion } from "framer-motion";
import { FileText, Mail, Calendar } from "lucide-react";
import styles from "./Legal.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import Container from "@/components/common/Container";

const TermsOfService = (): React.ReactElement => {
  return (
    <div className={styles.legalPage}>
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={styles.content}
        >
          <motion.span variants={fadeUp} className={styles.badge}>
            <FileText size={14} strokeWidth={2.5} />
            LEGAL
          </motion.span>

          <motion.h1 variants={fadeUp} className={styles.title}>
            Terms of Service
          </motion.h1>

          <motion.div variants={fadeUp} className={styles.meta}>
            <span className={styles.metaItem}>
              <Calendar size={14} strokeWidth={2} />
              Last Updated: August 2026
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.body}>
            <section>
              <h2>Acceptance of Terms</h2>
              <p>
                By using C2X ("the Service"), you agree to be bound by
                these Terms of Service ("Terms"). If you do not agree to these
                Terms, you may not use the Service.
              </p>
              <p>
                These Terms apply to all users, including those who use the
                Service for personal or commercial purposes. We reserve the
                right to update these Terms at any time. Your continued use of
                the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2>Use of C2X</h2>
              <p>
                C2X is a cloud-based development environment that
                provides AI-powered coding assistance, real-time collaboration,
                and a suite of developer tools. You may use the Service for
                lawful purposes only.
              </p>
              <p>
                We grant you a limited, non-exclusive, non-transferable license
                to use the Service in accordance with these Terms. All rights
                not expressly granted are reserved.
              </p>
            </section>

            <section>
              <h2>User Responsibilities</h2>
              <ul>
                <li>
                  <strong>Account Security:</strong> You are responsible for
                  maintaining the security of your account and any activities
                  that occur under your account. We recommend using strong
                  passwords and enabling two-factor authentication.
                </li>
                <li>
                  <strong>Compliance:</strong> You agree to comply with all
                  applicable laws and regulations while using the Service.
                </li>
                <li>
                  <strong>Accuracy of Information:</strong> You agree to provide
                  accurate and complete information when creating an account and
                  to update it as necessary.
                </li>
                <li>
                  <strong>Age Requirement:</strong> You must be at least 13
                  years old to use the Service. If you are under 18, you must
                  have parental consent.
                </li>
              </ul>
            </section>

            <section>
              <h2>Acceptable Use</h2>
              <p>When using the Service, you agree not to:</p>
              <ul>
                <li>
                  Use the Service for any illegal or unauthorized purpose.
                </li>
                <li>Violate any laws, regulations, or third-party rights.</li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Service.
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service or its
                  related systems.
                </li>
                <li>
                  Upload or transmit viruses, malware, or any other malicious
                  code.
                </li>
                <li>Harass, abuse, or harm other users of the Service.</li>
                <li>
                  Use automated systems (bots, crawlers) to access the Service
                  without our permission.
                </li>
                <li>
                  Reverse engineer, decompile, or disassemble any part of the
                  Service.
                </li>
                <li>
                  Share or distribute your account credentials with others.
                </li>
              </ul>
            </section>

            <section>
              <h2>Intellectual Property</h2>
              <p>
                C2X and its original content, features, and
                functionality are owned by C2X and are protected by
                copyright, trademark, patent, trade secret, and other
                intellectual property laws.
              </p>
              <p>
                You retain ownership of any code, files, and content you create
                using the Service. By using the Service, you grant us a license
                to host, store, and process your content solely to provide the
                Service to you.
              </p>
              <p>
                You agree not to use our trademarks, logos, or brand assets
                without prior written consent.
              </p>
            </section>

            <section>
              <h2>Open Source Components</h2>
              <p>
                C2X is built upon and integrates with various open
                source projects. We are grateful to the open source community
                for their contributions.
              </p>
              <p>
                All open source components used in the Service are subject to
                their respective licenses. We comply with all open source
                license requirements and make source code available as required.
              </p>
            </section>

            <section>
              <h2>Disclaimer</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM
                ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted,
                secure, or error-free. We do not warrant that any defects will
                be corrected or that the Service will meet your requirements.
              </p>
            </section>

            <section>
              <h2>Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
                C2X IDE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
                LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
                LOSSES, RESULTING FROM:
              </p>
              <ul>
                <li>Your use or inability to use the Service.</li>
                <li>Any unauthorized access to or alteration of your data.</li>
                <li>
                  Any conduct or content of any third party on the Service.
                </li>
                <li>
                  Any bugs, viruses, or other harmful code that may be
                  transmitted through the Service.
                </li>
              </ul>
            </section>

            <section>
              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice, for any reason,
                including but not limited to a breach of these Terms.
              </p>
              <p>
                You may terminate your account at any time by contacting us or
                through the account settings. Upon termination, we will delete
                or anonymize your data in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the jurisdiction in which C2X
                operates, without regard to its conflict of law provisions.
              </p>
              <p>
                Any legal action arising out of or relating to these Terms shall
                be brought in the courts of that jurisdiction.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className={styles.contactBox}>
                <Mail size={16} strokeWidth={2} />
                <span>support@c2x.dev</span>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TermsOfService;
