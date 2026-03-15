import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { Shield, Lock, Zap, Award, ArrowRight, BookOpen, FlaskConical, BadgeCheck } from "lucide-react";

import AnimatedHero from "./AnimatedHero";
import CountUp from "./CountUp";

import {
    StatsStrip, StatItem, StatDivider,
    SectionIntro, SectionLabel, SectionHeading, SectionSub,
    FeaturesGrid, FeatureCard, FeatureIconWrap, FeatureTitle, FeatureDesc,
    StepsSection, StepsGrid, StepItem, StepNum, StepTitle, StepDesc, StepIconWrap,
    TestimonialsSection, TestimonialsGrid, TestimonialCard,
    TestimonialStars, TestimonialQuote, TestimonialAuthor, AuthorName, AuthorRole,
    CTABannerSection, CTABannerInner, CTABannerLabel, CTABannerTitle,
    CTABannerSub, CTABannerActions, CTABannerBtn,
    Section, SectionHeader, SectionTitle, SectionLink, CoursesGrid,
} from "./Home.styles";

import { action } from "store/action";
import type { RootState } from "store/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "config/configuration.ts";
import CourseCard from "components/courses/CourseCard/CourseCard.tsx";
import MatrixRain from "components/MatrixRain/MatrixRain";
import { useAccess } from "utils/useAccess.ts";

// ─── Variants ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUpBlur = {
    hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
    visible: (i: number = 0) => ({
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.55, delay: i * 0.09, ease: EASE },
    }),
};

const slideLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

const slideRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    visible: (i: number = 0) => ({
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
    }),
};

const fadeIn = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ─── Data (icon-only, labels resolved via intl) ───────────────────────────────
const statsValues = [
    { value: "12K+", labelId: "stats.learners" },
    { value: "98%",  labelId: "stats.satisfaction" },
    { value: "200+", labelId: "stats.courses" },
    { value: "50+",  labelId: "stats.experts" },
];

const features = [
    { icon: Shield, titleId: "features.elite.title",         descId: "features.elite.desc" },
    { icon: Lock,   titleId: "features.practice.title",      descId: "features.practice.desc" },
    { icon: Zap,    titleId: "features.progress.title",      descId: "features.progress.desc" },
    { icon: Award,  titleId: "features.certification.title", descId: "features.certification.desc" },
];

const steps = [
    { icon: BookOpen,    num: "01", titleId: "steps.one.title",   descId: "steps.one.desc" },
    { icon: FlaskConical, num: "02", titleId: "steps.two.title",  descId: "steps.two.desc" },
    { icon: BadgeCheck,  num: "03", titleId: "steps.three.title", descId: "steps.three.desc" },
];

const testimonialKeys = [0, 1, 2];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Divider = () => (
    <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE }}
        viewport={{ once: true }}
        style={{
            height: 1,
            background: "rgba(0,0,0,0.07)",
            maxWidth: 1100,
            margin: "0 auto 5rem",
            transformOrigin: "left",
        }}
    />
);

// ─── Component ────────────────────────────────────────────────────────────────
const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { featured: featuredCourses } = useSelector((state: RootState) => state.course);
    const { canAccess } = useAccess();
    const intl = useIntl();

    useEffect(() => {
        dispatch(action.course.fetchFeaturedCourses());
    }, []);

    return (
        <>
            <MatrixRain />
            <AnimatedHero />

            {/* ── Stats ── */}
            <StatsStrip>
                {statsValues.map((s, i) => (
                    <Fragment key={s.labelId}>
                        {i > 0 && <StatDivider />}
                        <motion.div
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            custom={i}
                            viewport={{ once: true, margin: "-40px" }}
                        >
                            <StatItem>
                                <strong><CountUp value={s.value} /></strong>
                                <span><FormattedMessage id={s.labelId} /></span>
                            </StatItem>
                        </motion.div>
                    </Fragment>
                ))}
            </StatsStrip>

            <Divider />

            {/* ── Features ── */}
            <Section>
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionIntro>
                        <SectionLabel><FormattedMessage id="features.label" /></SectionLabel>
                        <SectionHeading><FormattedMessage id="features.heading" /></SectionHeading>
                        <SectionSub><FormattedMessage id="features.sub" /></SectionSub>
                    </SectionIntro>
                </motion.div>
                <FeaturesGrid>
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            custom={i}
                            viewport={{ once: true, margin: "-40px" }}
                            style={{ display: "flex" }}
                        >
                            <FeatureCard style={{ flex: 1 }}>
                                <FeatureIconWrap><f.icon /></FeatureIconWrap>
                                <FeatureTitle><FormattedMessage id={f.titleId} /></FeatureTitle>
                                <FeatureDesc><FormattedMessage id={f.descId} /></FeatureDesc>
                            </FeatureCard>
                        </motion.div>
                    ))}
                </FeaturesGrid>
            </Section>

            <Divider />

            {/* ── How it works ── */}
            <StepsSection>
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionIntro>
                        <SectionLabel><FormattedMessage id="steps.label" /></SectionLabel>
                        <SectionHeading><FormattedMessage id="steps.heading" /></SectionHeading>
                    </SectionIntro>
                </motion.div>
                <StepsGrid>
                    {steps.map((s, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            custom={i}
                            viewport={{ once: true, margin: "-40px" }}
                        >
                            <StepItem>
                                <StepNum>{s.num}</StepNum>
                                <StepIconWrap><s.icon /></StepIconWrap>
                                <StepTitle><FormattedMessage id={s.titleId} /></StepTitle>
                                <StepDesc><FormattedMessage id={s.descId} /></StepDesc>
                            </StepItem>
                        </motion.div>
                    ))}
                </StepsGrid>
            </StepsSection>

            <Divider />

            {/* ── Featured Courses ── */}
            {featuredCourses && featuredCourses.length > 0 && (
                <Section>
                    <SectionHeader>
                        <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <SectionTitle>
                                <FormattedMessage id="home.featured.title" /> <span>({featuredCourses.length})</span>
                            </SectionTitle>
                        </motion.div>
                        <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Link to="/courses">
                                <SectionLink><FormattedMessage id="home.featured.see_all" /> <ArrowRight size={14} /></SectionLink>
                            </Link>
                        </motion.div>
                    </SectionHeader>
                    <CoursesGrid>
                        {featuredCourses.map((c, i) => (
                            <motion.div
                                key={c.id}
                                variants={scaleUp}
                                initial="hidden"
                                whileInView="visible"
                                custom={i}
                                viewport={{ once: true, margin: "-40px" }}
                            >
                                <CourseCard course={c} isLocked={!canAccess(c.id)} />
                            </motion.div>
                        ))}
                    </CoursesGrid>
                </Section>
            )}

            <Divider />

            {/* ── Testimonials ── */}
            <TestimonialsSection>
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionIntro>
                        <SectionLabel><FormattedMessage id="testimonials.label" /></SectionLabel>
                        <SectionHeading><FormattedMessage id="testimonials.heading" /></SectionHeading>
                        <SectionSub><FormattedMessage id="testimonials.sub" /></SectionSub>
                    </SectionIntro>
                </motion.div>
                <TestimonialsGrid>
                    {testimonialKeys.map((i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            custom={i}
                            viewport={{ once: true, margin: "-40px" }}
                            style={{ display: "flex" }}
                        >
                            <TestimonialCard style={{ flex: 1 }}>
                                <TestimonialStars>{"★★★★★"}</TestimonialStars>
                                <TestimonialQuote>"{intl.formatMessage({ id: `testimonials.${i}.quote` })}"</TestimonialQuote>
                                <TestimonialAuthor>
                                    <AuthorName><FormattedMessage id={`testimonials.${i}.name`} /></AuthorName>
                                    <AuthorRole><FormattedMessage id={`testimonials.${i}.role`} /></AuthorRole>
                                </TestimonialAuthor>
                            </TestimonialCard>
                        </motion.div>
                    ))}
                </TestimonialsGrid>
            </TestimonialsSection>

            {/* ── CTA Banner ── */}
            <CTABannerSection>
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.65, ease: EASE }}
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <CTABannerInner>
                        <CTABannerLabel><FormattedMessage id="cta.label" /></CTABannerLabel>
                        <CTABannerTitle><FormattedMessage id="cta.title" /></CTABannerTitle>
                        <CTABannerSub><FormattedMessage id="cta.sub" /></CTABannerSub>
                        <CTABannerActions>
                            <Link to="/register">
                                <CTABannerBtn $variant="primary">
                                    <FormattedMessage id="cta.register" /> <ArrowRight size={15} />
                                </CTABannerBtn>
                            </Link>
                            <Link to="/courses">
                                <CTABannerBtn $variant="outline">
                                    <FormattedMessage id="cta.explore" />
                                </CTABannerBtn>
                            </Link>
                        </CTABannerActions>
                    </CTABannerInner>
                </motion.div>
            </CTABannerSection>
        </>
    );
};

export default Home;
