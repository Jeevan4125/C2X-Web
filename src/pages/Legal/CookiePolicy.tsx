import { motion } from "framer-motion";
import { Cookie, Mail, Calendar } from "lucide-react";
import styles from "./Legal.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import Container from "@/components/common/Container";

const CookiePolicy = (): React.ReactElement => {
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
            <Cookie size={14} strokeWidth={2.5} />
            LEGAL
          </motion.span>

          <motion.h1 variants={fadeUp} className={styles.title}>
            Cookie Policy
          </motion.h1>

          <motion.div variants={fadeUp} className={styles.meta}>
            <span className={styles.metaItem}>
              <Calendar size={14} strokeWidth={2} />
              Last Updated: August 2026
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.body}>
            <section>
              <h2>What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and to provide information
                to the website owners.
              </p>
              <p>
                Cookies enable websites to remember your actions and preferences
                over a period of time, so you don't have to keep re-entering
                them whenever you come back to the site or browse from one page
                to another.
              </p>
            </section>

            <section>
              <h2>Types of Cookies We Use</h2>
              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the Service to function properly
                and cannot be disabled in our systems. They are usually set in
                response to actions made by you, such as setting your privacy
                preferences, logging in, or filling in forms.
              </p>
              <p>
                You can set your browser to block or alert you about these
                cookies, but some parts of the Service may not work properly
                without them.
              </p>

              <h3>Analytics Cookies</h3>
              <p>
                These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our Service. They
                help us know which pages are the most and least popular and see
                how visitors move around the site.
              </p>
              <p>
                All information these cookies collect is aggregated and
                anonymous. If you do not allow these cookies, we will not know
                when you have visited our site and will not be able to monitor
                its performance.
              </p>

              <h3>Preference Cookies</h3>
              <p>
                These cookies enable the Service to remember information that
                changes the way the Service behaves or looks, such as your
                preferred language, theme, or region.
              </p>
              <p>
                These cookies are only used to improve your experience and are
                not used to track you across other websites.
              </p>
            </section>

            <section>
              <h2>Managing Cookies</h2>
              <p>
                You have the right to accept or reject cookies. Most web
                browsers automatically accept cookies, but you can usually
                modify your browser setting to decline cookies if you prefer.
              </p>
              <p>
                You can manage your cookie preferences through your browser
                settings. Here are links to the cookie management pages for
                popular browsers:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p>
                Please note that if you choose to reject cookies, you may not be
                able to use all features of the Service.
              </p>
            </section>

            <section>
              <h2>Third-Party Cookies</h2>
              <p>
                We may also use third-party cookies from trusted partners to
                provide certain features and services. These third parties have
                their own privacy policies and are responsible for their own
                cookie practices.
              </p>
              <p>
                We do not have control over these third-party cookies and
                recommend that you review their respective privacy policies.
              </p>
            </section>

            <section>
              <h2>Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in technology, regulation, or our practices. We will
                notify you of any changes by posting the new policy on this page
                with an updated "Last Updated" date.
              </p>
              <p>
                We encourage you to review this policy periodically to stay
                informed about our use of cookies.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please
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

export default CookiePolicy;
