import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import styled, { keyframes } from "styled-components";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────
const HeroWrapper = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Container = styled.div`
  max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 5rem 0;
  text-align: center;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: #f4f4f5;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 100px;
  font-size: 12.5px;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: background 0.2s ease;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;

  &:hover {
    background: #ebebec;
  }
`;

const GreenDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 7vw, 4.5rem);
  line-height: 1.1;
  font-weight: 400;
  color: #0a0a0a;
  margin: 0;
  letter-spacing: -0.05em;
  text-align: center;
  max-width: 42rem;
`;

const AnimatedWordRow = styled.span`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  overflow-x: visible;
  overflow-y: clip;
  padding-bottom: 8px;
  padding-top: 8px;
`;

const Description = styled.p`
  color: #6b7280;
  max-width: 42rem;
  margin: 0 auto;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.625;
  letter-spacing: -0.025em;
  text-align: center;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
`;

const CTAButton = styled.a<{ $variant?: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.1px;

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? `
    background: #0a0a0a;
    color: #fff;
    border: 1px solid #0a0a0a;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
    &:hover {
      background: #1a1a1a;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    }
    `
      : `
    background: #fff;
    color: #0a0a0a;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    &:hover {
      border-color: rgba(0,0,0,0.2);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    }
  `}

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
function AnimatedHero() {
  const intl = useIntl();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      intl.formatMessage({ id: "hero.word.cybersecurity" }),
      intl.formatMessage({ id: "hero.word.cryptography" }),
      intl.formatMessage({ id: "hero.word.forensics" }),
      intl.formatMessage({ id: "hero.word.exploitation" }),
      intl.formatMessage({ id: "hero.word.defense" }),
    ],
    [intl.locale]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <HeroWrapper>
      <Container>
        <Badge>
          <GreenDot /> {intl.formatMessage({ id: "hero.badge" })} <MoveRight size={14} />
        </Badge>

        <TitleBlock>
          <Title>{intl.formatMessage({ id: "hero.title_line1" })}</Title>
          <Title>
            <AnimatedWordRow>
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  style={{ position: "absolute", fontWeight: 600 }}
                  initial={{ opacity: 0, y: -100 }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </AnimatedWordRow>
          </Title>
        </TitleBlock>

        <Description>
          {intl.formatMessage({ id: "hero.description" })}
        </Description>

        <CTAGroup>
          <Link to="/courses">
            <CTAButton $variant="primary">
              {intl.formatMessage({ id: "hero.cta_primary" })} <ArrowRight size={16} />
            </CTAButton>
          </Link>
          <Link to="/dashboard">
            <CTAButton $variant="secondary">
              {intl.formatMessage({ id: "hero.cta_secondary" })}
            </CTAButton>
          </Link>
        </CTAGroup>
      </Container>
    </HeroWrapper>
  );
}

export default AnimatedHero;