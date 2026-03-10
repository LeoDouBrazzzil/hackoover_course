import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
    HeroSection,
    HeroContainer,
    HeroBadge,
    HeroTitle,
    HeroDesc,
    HeroCTAGroup,
    CTABtn,
    StatsStrip,
    StatItem,
    StatDivider,
    FeaturesGrid,
    FeatureCard,
    FeatureIconWrap,
    FeatureTitle,
    FeatureDesc,
    Section,
    SectionHeader,
    SectionTitle,
    SectionLink,
    CoursesGrid,
} from "./Home.styles";

import { Shield, Lock, Zap, Award, ArrowRight } from "lucide-react";

import { action } from "store/action";
import type { RootState } from "store/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "config/configuration.ts";
import CourseCard from "components/courses/CourseCard/CourseCard.tsx";
import MatrixRain from "components/MatrixRain/MatrixRain";

const features = [
    {
        icon: Shield,
        title: "Formation d'Élite",
        description: "Des cours conçus par des experts en cybersécurité reconnus dans l'industrie.",
    },
    {
        icon: Lock,
        title: "Pratique Réelle",
        description: "Des labs et simulations pour une expérience concrète sur des cas réels.",
    },
    {
        icon: Zap,
        title: "Progression Rapide",
        description: "Apprenez à votre rythme avec un suivi personnalisé et adaptatif.",
    },
    {
        icon: Award,
        title: "Certification",
        description: "Validez vos compétences avec des certifications reconnues par l'industrie.",
    },
];

const stats = [
    { value: "12K+",  label: "Apprenants" },
    { value: "98%",   label: "Satisfaction" },
    { value: "200+",  label: "Cours" },
    { value: "50+",   label: "Experts" },
];

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { featured: featuredCourses } = useSelector((state: RootState) => state.course);

    useEffect(() => {
        dispatch(action.course.fetchFeaturedCourses());
    }, []);

    return (
        <>
            {/* ── Matrix Rain Effect ── */}
            <MatrixRain />

            {/* ── Hero ── */}
            <HeroSection>
                <HeroContainer>
                    <HeroBadge>
                        <span /> Plateforme #1 en cybersécurité
                    </HeroBadge>

                    <HeroTitle>
                        Maîtrisez la
                        <br />
                        <span>Cybersécurité</span>
                    </HeroTitle>

                    <HeroDesc>
                        Développez vos compétences en sécurité informatique avec des cours pratiques,
                        des exercices réels et un accompagnement d'experts.
                    </HeroDesc>

                    <HeroCTAGroup>
                        <Link to="/courses">
                            <CTABtn $variant="primary">
                                Explorer les cours <ArrowRight size={16} />
                            </CTABtn>
                        </Link>
                        <Link to="/dashboard">
                            <CTABtn $variant="secondary">
                                Mon dashboard
                            </CTABtn>
                        </Link>
                    </HeroCTAGroup>
                </HeroContainer>
            </HeroSection>

            {/* ── Stats ── */}
            <StatsStrip>
                {stats.map((s, i) => (
                    <>
                        {i > 0 && <StatDivider key={`div-${i}`} />}
                        <StatItem key={s.label}>
                            <strong>{s.value}</strong>
                            <span>{s.label}</span>
                        </StatItem>
                    </>
                ))}
            </StatsStrip>

            {/* ── Features ── */}
            <FeaturesGrid>
                {features.map((f, i) => (
                    <FeatureCard key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                        <FeatureIconWrap>
                            <f.icon />
                        </FeatureIconWrap>
                        <FeatureTitle>{f.title}</FeatureTitle>
                        <FeatureDesc>{f.description}</FeatureDesc>
                    </FeatureCard>
                ))}
            </FeaturesGrid>

            {/* ── Featured Courses ── */}
            {featuredCourses && featuredCourses.length > 0 && (
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            Cours en vedette <span>({featuredCourses.length})</span>
                        </SectionTitle>
                        <Link to="/courses">
                            <SectionLink>
                                Voir tout <ArrowRight size={14} />
                            </SectionLink>
                        </Link>
                    </SectionHeader>

                    <CoursesGrid>
                        {featuredCourses.map((c) => (
                            <CourseCard key={c.id} course={c} />
                        ))}
                    </CoursesGrid>
                </Section>
            )}
        </>
    );
};

export default Home;
