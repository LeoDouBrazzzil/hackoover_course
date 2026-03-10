import { useState } from "react";
import * as S from "./RegisterPage.styles";
import {GoogleIcon} from "assets/icon/GoogleIcon.tsx";
import {FacebookIcon} from "assets/icon/FacebookIcon.tsx";
import {EyeIcon} from "assets/icon/EyeIcon.tsx";
import {CheckIcon} from "assets/icon/CheckIcon.tsx";
import {CrossIcon} from "assets/icon/CrossIcon.tsx";
import {Link} from "react-router-dom";
import api from "api/api.ts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}


// ─── Password strength helper ─────────────────────────────────────────────────
const PW_RULES = [
  { id: "len",   label: "8 caractères minimum", test: (v: string) => v.length >= 8 },
  { id: "upper", label: "Une lettre majuscule",  test: (v: string) => /[A-Z]/.test(v) },
  { id: "num",   label: "Un chiffre",            test: (v: string) => /[0-9]/.test(v) },
  { id: "sym",   label: "Un caractère spécial",  test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function getStrength(pw: string): PasswordStrength {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  const map: Record<number, { label: string; color: string }> = {
    1: { label: "Faible", color: "#ef4444" },
    2: { label: "Moyen",  color: "#f97316" },
    3: { label: "Bon",    color: "#eab308" },
    4: { label: "Fort",   color: "#22c55e" },
  };
  return { score, ...(map[score] ?? { label: "Faible", color: "#ef4444" }) };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    username: "", firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "", terms: false,
  });
  const [showPw, setShowPw]           = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwFocused, setPwFocused]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [error, setError]             = useState("");

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const strength          = getStrength(form.password);
  const passwordsMatch    = !!form.confirmPassword && form.password === form.confirmPassword;
  const passwordsMismatch = !!form.confirmPassword && form.password !== form.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms || passwordsMismatch) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.auth.register({
        username: form.username,
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });

      if (response.message) {
        setError(response.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
      setLoading(false);
    }
  };

  return (
    <>
      <S.GlobalStyle />

      <S.Page>
        <S.Card>

          {/* ── Logo ── */}
          <S.LogoWrap>
            <S.LogoMark>⌘</S.LogoMark>
            <S.LogoText>Hackoover</S.LogoText>
          </S.LogoWrap>

          {success ? (
            /* ── Success state ── */
            <S.SuccessBox>
              <S.SuccessIcon>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </S.SuccessIcon>
              <S.SuccessTitle>Compte créé avec succès !</S.SuccessTitle>
              <S.SuccessText>
                Un e-mail de confirmation a été envoyé à<br/>
                <strong style={{ color: S.tokens.text }}>{form.email}</strong>
              </S.SuccessText>
              <S.CardFooter style={{ marginTop: 24 }}>
                <Link to="/login">Aller à la connexion →</Link>
              </S.CardFooter>
            </S.SuccessBox>

          ) : (
            <>
              {/* ── Heading ── */}
              <S.Title>Créer un compte</S.Title>
              <S.Subtitle>Rejoignez des milliers d'utilisateurs dès aujourd'hui.</S.Subtitle>

              {/* ── Social buttons ── */}
              <S.SocialsGrid>
                <S.SocialButton type="button"><GoogleIcon /> Google</S.SocialButton>
                <S.SocialButton type="button"><FacebookIcon /> Facebook</S.SocialButton>
              </S.SocialsGrid>

              {/* ── Divider ── */}
              <S.Divider>
                <S.DividerLine />
                <S.DividerText>ou</S.DividerText>
                <S.DividerLine />
              </S.Divider>

              {/* ── Error message ── */}
              {error && (
                <div style={{
                  padding: "12px 16px",
                  marginBottom: "16px",
                  backgroundColor: "#fee",
                  color: "#c00",
                  borderRadius: "8px",
                  border: "1px solid #fcc"
                }}>
                  {error}
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={handleSubmit}>

                {/* Username */}
                <S.Field>
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <S.Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={set("username")}
                    autoComplete="username"
                    required
                  />
                </S.Field>

                {/* Prénom / Nom */}
                <S.FieldRow>
                  <S.Field>
                    <label htmlFor="firstName">Prénom</label>
                    <S.Input
                      id="firstName"
                      type="text"
                      placeholder="Jean"
                      value={form.firstName}
                      onChange={set("firstName")}
                      autoComplete="given-name"
                      required
                    />
                  </S.Field>
                  <S.Field>
                    <label htmlFor="lastName">Nom</label>
                    <S.Input
                      id="lastName"
                      type="text"
                      placeholder="Dupont"
                      value={form.lastName}
                      onChange={set("lastName")}
                      autoComplete="family-name"
                      required
                    />
                  </S.Field>
                </S.FieldRow>

                {/* Email */}
                <S.Field>
                  <label htmlFor="email">Adresse e-mail</label>
                  <S.Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@exemple.com"
                    value={form.email}
                    onChange={set("email")}
                    autoComplete="email"
                    required
                  />
                </S.Field>

                {/* Mot de passe */}
                <S.Field>
                  <label htmlFor="password">Mot de passe</label>
                  <S.InputWrap>
                    <S.Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      $hasToggle
                      value={form.password}
                      onChange={set("password")}
                      onFocus={() => setPwFocused(true)}
                      onBlur={() => setPwFocused(false)}
                      autoComplete="new-password"
                      required
                    />
                    <S.TogglePasswordButton
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      aria-label={showPw ? "Masquer" : "Afficher"}
                    >
                      <EyeIcon open={showPw} />
                    </S.TogglePasswordButton>
                  </S.InputWrap>

                  {/* Strength bar */}
                  {form.password && (
                    <S.StrengthWrap>
                      <S.StrengthBars>
                        {[1, 2, 3, 4].map(i => (
                          <S.StrengthBar
                            key={i}
                            $active={i <= strength.score}
                            $color={strength.color}
                          />
                        ))}
                      </S.StrengthBars>
                      {strength.label && (
                        <S.StrengthLabel $color={strength.color}>
                          {strength.label}
                        </S.StrengthLabel>
                      )}
                    </S.StrengthWrap>
                  )}

                  {/* Password rules checklist */}
                  {(pwFocused || form.password) && (
                    <S.PwRulesBox>
                      {PW_RULES.map(rule => (
                        <S.PwRule key={rule.id} $ok={rule.test(form.password)}>
                          <S.RuleDot $ok={rule.test(form.password)}>
                            {rule.test(form.password) && <CheckIcon />}
                          </S.RuleDot>
                          {rule.label}
                        </S.PwRule>
                      ))}
                    </S.PwRulesBox>
                  )}
                </S.Field>

                {/* Confirmation mot de passe */}
                <S.Field>
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  <S.InputWrap>
                    <S.Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      $hasToggle
                      $valid={passwordsMatch}
                      $error={passwordsMismatch}
                      value={form.confirmPassword}
                      onChange={set("confirmPassword")}
                      autoComplete="new-password"
                      required
                    />
                    <S.TogglePasswordButton
                      type="button"
                      onClick={() => setShowConfirm(v => !v)}
                      aria-label={showConfirm ? "Masquer" : "Afficher"}
                    >
                      <EyeIcon open={showConfirm} />
                    </S.TogglePasswordButton>
                  </S.InputWrap>

                  {passwordsMatch && (
                    <S.MatchHint $ok><CheckIcon /> Les mots de passe correspondent</S.MatchHint>
                  )}
                  {passwordsMismatch && (
                    <S.MatchHint><CrossIcon /> Les mots de passe ne correspondent pas</S.MatchHint>
                  )}
                </S.Field>

                {/* CGU */}
                <S.TermsRow>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={form.terms}
                    onChange={set("terms")}
                    required
                  />
                  <span>
                    J'accepte les{" "}
                    <a href="#">Conditions d'utilisation</a> et la{" "}
                    <a href="#">Politique de confidentialité</a> de Hackoover.
                  </span>
                </S.TermsRow>

                {/* Submit */}
                <S.SubmitButton
                  type="submit"
                  disabled={loading || !form.terms || !!passwordsMismatch}
                >
                  {loading ? <S.Spinner /> : "Créer mon compte"}
                </S.SubmitButton>
              </form>

              {/* Footer */}
              <S.CardFooter>
                Déjà un compte ? <Link to="/login">Se connecter</Link>
              </S.CardFooter>
            </>
          )}

        </S.Card>
      </S.Page>
    </>
  );
}
