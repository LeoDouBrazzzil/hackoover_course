import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Zap, BookOpen, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { useIntl } from "react-intl";
import api from "api/api.ts";
import { useAuth } from "utils/useAuth.ts";

// ─── Styled Components ────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 5rem 1rem 6rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  animation: ${fadeUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

const Label = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-4);
  margin: 0 0 12px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.05em;
  margin: 0 0 12px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--text-3);
  max-width: 460px;
  margin: 0 auto;
  line-height: 1.65;
  letter-spacing: -0.01em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ $featured?: boolean }>`
  border-radius: 20px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $featured }) => $featured ? `
    background: #0a0a0a;
    border: 1px solid #0a0a0a;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 60%);
      top: -120px; right: -120px;
      pointer-events: none;
    }
  ` : `
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  `}

  &:hover { transform: translateY(-3px); }
`;

const CardBadge = styled.span<{ $featured?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  width: fit-content;

  ${({ $featured }) => $featured ? `
    background: rgba(34,197,94,0.15);
    color: #22c55e;
    border: 1px solid rgba(34,197,94,0.3);
  ` : `
    background: var(--bg-3);
    color: var(--text-3);
    border: 1px solid var(--border);
  `}
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Price = styled.div<{ $featured?: boolean }>`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: ${({ $featured }) => $featured ? "#fff" : "var(--text)"};
  line-height: 1;

  sup {
    font-size: 1.2rem;
    font-weight: 700;
    vertical-align: super;
    letter-spacing: 0;
    margin-right: 2px;
  }
  sub {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ $featured }) => $featured ? "rgba(255,255,255,0.5)" : "var(--text-4)"};
    letter-spacing: 0;
    margin-left: 2px;
  }
`;

const PriceSub = styled.p<{ $featured?: boolean }>`
  font-size: 13px;
  color: ${({ $featured }) => $featured ? "rgba(255,255,255,0.45)" : "var(--text-4)"};
  margin: 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const Feature = styled.li<{ $featured?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  color: ${({ $featured }) => $featured ? "rgba(255,255,255,0.85)" : "var(--text-2)"};
  line-height: 1.4;

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    margin-top: 1px;
    color: ${({ $featured }) => $featured ? "#22c55e" : "var(--text)"};
  }
`;

const CTA = styled.button<{ $featured?: boolean; $loading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  cursor: ${({ $loading }) => $loading ? "wait" : "pointer"};
  transition: all 0.2s ease;
  border: none;
  letter-spacing: -0.1px;

  ${({ $featured }) => $featured ? `
    background: #fff;
    color: #0a0a0a;
    &:hover { background: #f4f4f5; transform: translateY(-1px); }
  ` : `
    background: var(--accent);
    color: var(--accent-fg);
    box-shadow: 0 4px 14px rgba(0,0,0,0.2);
    &:hover { background: color-mix(in srgb, var(--accent) 85%, transparent); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
  `}

  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const SuccessMsg = styled.p<{ $featured?: boolean }>`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #22c55e;
  margin: 0;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 3rem 0;
`;

const FaqSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FaqItem = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 6px;
    letter-spacing: -0.2px;
  }
  p {
    font-size: 13px;
    color: var(--text-3);
    line-height: 1.65;
    margin: 0;
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Tarifs() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const intl = useIntl();

    const [subLoading, setSubLoading]   = useState(false);
    const [subSuccess, setSubSuccess]   = useState(false);

    const handleSubscribe = async () => {
        if (!isAuthenticated) { navigate("/login"); return; }
        setSubLoading(true);
        try {
            await api.access.subscribe();
            setSubSuccess(true);
            setTimeout(() => navigate("/courses"), 1800);
        } finally {
            setSubLoading(false);
        }
    };

    return (
        <Page>
            <Header>
                <Label>{intl.formatMessage({ id: "pricing.label" })}</Label>
                <Title>{intl.formatMessage({ id: "pricing.title" })}</Title>
                <Subtitle>{intl.formatMessage({ id: "pricing.sub" })}</Subtitle>
            </Header>

            <Grid>
                {/* ── Par cours ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                >
                    <Card>
                        <div>
                            <CardBadge><Lock size={11} /> {intl.formatMessage({ id: "pricing.per_course.badge" })}</CardBadge>
                        </div>
                        <PriceBlock>
                            <Price><sup>€</sup>{intl.formatMessage({ id: "pricing.per_course.price" })}<sub> {intl.formatMessage({ id: "pricing.per_course.unit" })}</sub></Price>
                            <PriceSub>{intl.formatMessage({ id: "pricing.per_course.sub" })}</PriceSub>
                        </PriceBlock>
                        <FeatureList>
                            <Feature key="f1"><Check /> {intl.formatMessage({ id: "pricing.per_course.feature1" })}</Feature>
                            <Feature key="f2"><Check /> {intl.formatMessage({ id: "pricing.per_course.feature2" })}</Feature>
                            <Feature key="f3"><Check /> {intl.formatMessage({ id: "pricing.per_course.feature3" })}</Feature>
                            <Feature key="f4"><Check /> {intl.formatMessage({ id: "pricing.per_course.feature4" })}</Feature>
                        </FeatureList>
                        <CTA onClick={() => navigate("/courses")}>
                            <BookOpen size={15} /> {intl.formatMessage({ id: "pricing.per_course.cta" })}
                        </CTA>
                    </Card>
                </motion.div>

                {/* ── Abonnement ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                >
                    <Card $featured>
                        <div>
                            <CardBadge $featured><Zap size={11} /> {intl.formatMessage({ id: "pricing.sub_plan.badge" })}</CardBadge>
                        </div>
                        <PriceBlock>
                            <Price $featured><sup>€</sup>{intl.formatMessage({ id: "pricing.sub_plan.price" })}<sub> {intl.formatMessage({ id: "pricing.sub_plan.unit" })}</sub></Price>
                            <PriceSub $featured>{intl.formatMessage({ id: "pricing.sub_plan.sub" })}</PriceSub>
                        </PriceBlock>
                        <FeatureList>
                            <Feature $featured key="sf1"><Check /> {intl.formatMessage({ id: "pricing.sub_plan.feature1" })}</Feature>
                            <Feature $featured key="sf2"><Check /> {intl.formatMessage({ id: "pricing.sub_plan.feature2" })}</Feature>
                            <Feature $featured key="sf3"><Check /> {intl.formatMessage({ id: "pricing.sub_plan.feature3" })}</Feature>
                            <Feature $featured key="sf4"><Check /> {intl.formatMessage({ id: "pricing.sub_plan.feature4" })}</Feature>
                            <Feature $featured key="sf5"><Check /> {intl.formatMessage({ id: "pricing.sub_plan.feature5" })}</Feature>
                        </FeatureList>
                        {subSuccess ? (
                            <SuccessMsg>{intl.formatMessage({ id: "pricing.sub_plan.activated" })}</SuccessMsg>
                        ) : (
                            <CTA $featured onClick={handleSubscribe} disabled={subLoading} $loading={subLoading}>
                                {subLoading ? intl.formatMessage({ id: "pricing.sub_plan.activating" }) : <><Zap size={15} /> {intl.formatMessage({ id: "pricing.sub_plan.cta" })}</>}
                            </CTA>
                        )}
                    </Card>
                </motion.div>
            </Grid>

            <Divider />

            {/* ── FAQ ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                viewport={{ once: true }}
            >
                <FaqSection>
                    <FaqItem key="faq0">
                        <h4>{intl.formatMessage({ id: "pricing.faq.0.q" })}</h4>
                        <p>{intl.formatMessage({ id: "pricing.faq.0.a" })}</p>
                    </FaqItem>
                    <FaqItem key="faq1">
                        <h4>{intl.formatMessage({ id: "pricing.faq.1.q" })}</h4>
                        <p>{intl.formatMessage({ id: "pricing.faq.1.a" })}</p>
                    </FaqItem>
                    <FaqItem key="faq2">
                        <h4>{intl.formatMessage({ id: "pricing.faq.2.q" })}</h4>
                        <p>{intl.formatMessage({ id: "pricing.faq.2.a" })}</p>
                    </FaqItem>
                    <FaqItem key="faq3">
                        <h4>{intl.formatMessage({ id: "pricing.faq.3.q" })}</h4>
                        <p>{intl.formatMessage({ id: "pricing.faq.3.a" })}</p>
                    </FaqItem>
                </FaqSection>
            </motion.div>
        </Page>
    );
}
