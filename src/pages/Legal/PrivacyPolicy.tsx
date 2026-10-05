import { motion } from "framer-motion";
import { Shield, Mail, Calendar } from "lucide-react";
import styles from "./Legal.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import Container from "@/components/common/Container";

const PrivacyPolicy = (): React.ReactElement => {
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
            <Shield size={14} strokeWidth={2.5} />
            LEGAL
          </motion.span>

          <motion.h1 variants={fadeUp} className={styles.title}>
            Privacy Policy
          </motion.h1>

          <motion.div variants={fadeUp} className={styles.meta}>
            <span className={styles.metaItem}>
              <Calendar size={14} strokeWidth={2} />
              Last Updated: August 2026
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.body}>
            <section>
              <h2>Introduction</h2>
              <p>
                C2X ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our
                C2X platform, website, and related services
                (collectively, the "Service").
              </p>
              <p>
                By using the Service, you agree to the collection and use of
                information in accordance with this policy. We do not collect or
                process any personally identifiable information unless you
                voluntarily provide it to us.
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <h3>Information You Provide to Us</h3>
              <ul>
                <li>
                  <strong>Account Information:</strong> When you create an
                  account, we collect your name, email address, and profile
                  information.
                </li>
                <li>
                  <strong>User Content:</strong> Code, files, projects,
                  comments, and other content you create, upload, or share
                  through the Service.
                </li>
                <li>
                  <strong>Communication Data:</strong> Information you provide
                  when you contact us for support or participate in surveys and
                  feedback.
                </li>
              </ul>

              <h3>Information Collected Automatically</h3>
              <ul>
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with the Service, including features used, actions
                  taken, and time spent.
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, operating
                  system, device type, and IP address.
                </li>
                <li>
                  <strong>Cookies and Similar Technologies:</strong> We use
                  cookies to enhance your experience and analyze usage patterns.
                  See our Cookie Policy for more details.
                </li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <ul>
                <li>To provide, maintain, and improve the Service.</li>
                <li>
                  To personalize your experience and deliver relevant content.
                </li>
                <li>
                  To communicate with you, including sending updates and
                  promotional materials (with your consent).
                </li>
                <li>
                  To analyze usage trends and improve our platform performance.
                </li>
                <li>To ensure the security and integrity of the Service.</li>
                <li>To comply with legal obligations and enforce our terms.</li>
              </ul>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our Service and hold certain information. Cookies
                are files with a small amount of data that are stored on your
                device.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                Service.
              </p>
              <p>
                For more detailed information about our use of cookies, please
                review our Cookie Policy.
              </p>
            </section>

            <section>
              <h2>Analytics</h2>
              <p>
                We use analytics tools to help us understand how users interact
                with our Service. These tools collect information about your use
                of the Service, including your IP address, browser type, and
                pages visited.
              </p>
              <p>
                We do not sell or share your data with third parties for
                marketing purposes. All analytics data is used solely to improve
                our platform and user experience.
              </p>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>
                We may use third-party services to provide certain features of
                the Service. These services may have access to your information
                solely to perform tasks on our behalf and are obligated not to
                disclose or use it for any other purpose.
              </p>
              <p>
                We integrate with services such as GitHub for version control
                and authentication. Please review their privacy policies
                separately.
              </p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your information against unauthorized access,
                alteration, disclosure, or destruction. This includes
                encryption, secure data storage, and regular security audits.
              </p>
              <p>
                While we strive to use commercially acceptable means to protect
                your information, no method of transmission over the internet or
                electronic storage is 100% secure. We cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul>
                <li>
                  <strong>Access:</strong> Request a copy of the information we
                  hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request that we correct any
                  inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> Request that we delete your
                  personal information.
                </li>
                <li>
                  <strong>Restriction:</strong> Request that we restrict the
                  processing of your information.
                </li>
                <li>
                  <strong>Portability:</strong> Request that we transfer your
                  information to another service.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at the email
                address provided below.
              </p>
            </section>

            <section>
              <h2>Children's Privacy</h2>
              <p>
                Our Service is not intended for children under the age of 13. We
                do not knowingly collect personally identifiable information
                from children under 13. If we become aware that we have
                collected personal information from a child under 13, we will
                take steps to remove that information promptly.
              </p>
            </section>

            <section>
              <h2>Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
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

export default PrivacyPolicy;
