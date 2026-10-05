import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import styles from "./FeaturePage.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import Button from "@/components/common/Button/Button";
import type { Feature } from "@/data/featureData";
import { FEATURES } from "@/data/featureData";

interface FeaturePageProps {
  feature?: Feature;
}

const FeaturePage = ({ feature }: FeaturePageProps): React.ReactElement => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(false);

  useEffect(() => {
    if (!feature) {
      navigate("/features", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [feature, navigate]);

  if (!feature) {
    return (
      <div className={styles.loading}>
        <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(feature.codeExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedFeatures = FEATURES.filter((f) =>
    feature.relatedFeatures.includes(f.slug),
  );

  const Icon = feature.icon;

  return (
    <div className={styles.featurePage}>
      <div className={styles.content}>
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={styles.hero}
        >
          <div className={styles.heroContent}>
            <motion.div variants={fadeUp} className={styles.badge}>
              {feature.category}
            </motion.div>
            <motion.div variants={fadeUp} className={styles.iconWrapper}>
              <Icon size={48} strokeWidth={1.5} />
            </motion.div>
            <motion.h1 variants={fadeUp} className={styles.title}>
              {feature.name}
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.description}>
              {feature.longDescription}
            </motion.p>
          </div>
        </motion.section>

        {/* Overview */}
        <section className={styles.overview}>
          <div className={styles.container}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.sectionTitle}
            >
              Overview
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.overviewContent}
            >
              <p className={styles.overviewText}>{feature.longDescription}</p>
              <div className={styles.benefits}>
                <h3>Key Benefits</h3>
                <ul>
                  {feature.benefits.map((benefit, index) => (
                    <li key={index}>
                      <Check size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className={styles.keyFeatures}>
          <div className={styles.container}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.sectionTitle}
            >
              Key Features
            </motion.h2>
            <div className={styles.featuresGrid}>
              {feature.keyFeatures.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={index}
                    className={styles.featureCard}
                  >
                    <div className={styles.featureIcon}>
                      <ItemIcon size={24} strokeWidth={1.5} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className={styles.codeSection}>
          <div className={styles.container}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.sectionTitle}
            >
              Code Example
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.codeBlock}
            >
              <div className={styles.codeHeader}>
                <span className={styles.codeLanguage}>
                  {feature.codeExample.language}
                </span>
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div
                className={`${styles.codeBody} ${!codeExpanded ? styles.collapsed : ""}`}
                style={{ maxHeight: codeExpanded ? "none" : "300px" }}
              >
                <pre className={styles.pre}>
                  <code className={`language-${feature.codeExample.language}`}>
                    {feature.codeExample.code}
                  </code>
                </pre>
              </div>
              {feature.codeExample.code.split("\n").length > 15 && (
                <button
                  className={styles.toggleBtn}
                  onClick={() => setCodeExpanded(!codeExpanded)}
                >
                  {codeExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show more
                    </>
                  )}
                </button>
              )}
              {feature.codeExample.caption && (
                <p className={styles.codeCaption}>
                  {feature.codeExample.caption}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Workflow Timeline */}
        <section className={styles.workflow}>
          <div className={styles.container}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.sectionTitle}
            >
              Workflow
            </motion.h2>
            <div className={styles.timeline}>
              {feature.workflow.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                  className={styles.timelineItem}
                >
                  <div className={styles.timelineMarker}>
                    <span>{step.step}</span>
                  </div>
                  <div className={styles.timelineContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className={styles.specs}>
          <div className={styles.container}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.sectionTitle}
            >
              Technical Specifications
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.specsGrid}
            >
              <div className={styles.specItem}>
                <h3>Performance</h3>
                <p>{feature.specifications.performance}</p>
              </div>
              <div className={styles.specItem}>
                <h3>Platforms</h3>
                <ul>
                  {feature.specifications.platforms.map((platform) => (
                    <li key={platform}>{platform}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.specItem}>
                <h3>Requirements</h3>
                <ul>
                  {feature.specifications.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq}>
          <div className={styles.container}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.sectionTitle}
            >
              Frequently Asked Questions
            </motion.h2>
            <div className={styles.faqList}>
              {feature.faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                  className={styles.faqItem}
                >
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Features */}
        {relatedFeatures.length > 0 && (
          <section className={styles.related}>
            <div className={styles.container}>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={styles.sectionTitle}
              >
                Related Features
              </motion.h2>
              <div className={styles.relatedGrid}>
                {relatedFeatures.map((related, index) => {
                  const RelatedIcon = related.icon;
                  return (
                    <motion.div
                      key={related.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={index}
                      className={styles.relatedCard}
                    >
                      <Link
                        to={`/features/${related.slug}`}
                        className={styles.relatedLink}
                      >
                        <div className={styles.relatedIcon}>
                          <RelatedIcon size={24} strokeWidth={1.5} />
                        </div>
                        <h3>{related.name}</h3>
                        <p>{related.description}</p>
                        <span className={styles.relatedCta}>
                          Learn more
                          <ArrowLeft size={16} className={styles.arrowRight} />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FeaturePage;
