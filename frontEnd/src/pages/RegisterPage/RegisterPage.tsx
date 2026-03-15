import { useState } from "react";
import { useIntl } from "react-intl";
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
function getStrength(pw: string, map: Record<number, { label: string; color: string }>): PasswordStrength {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  return { score, ...(map[score] ?? { label: map[1].label, color: "#ef4444" }) };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const intl = useIntl();

  const PW_RULES = [
    { id: "len",   label: intl.formatMessage({ id: "register.pw_rule.length" }), test: (v: string) => v.length >= 8 },
    { id: "upper", label: intl.formatMessage({ id: "register.pw_rule.upper" }),  test: (v: string) => /[A-Z]/.test(v) },
    { id: "num",   label: intl.formatMessage({ id: "register.pw_rule.number" }), test: (v: string) => /[0-9]/.test(v) },
    { id: "sym",   label: intl.formatMessage({ id: "register.pw_rule.symbol" }), test: (v: string) => /[^A-Za-z0-9]/.test(v) },
  ];

  const strengthMap: Record<number, { label: string; color: string }> = {
    1: { label: intl.formatMessage({ id: "register.pw_strength.weak" }),  color: "#ef4444" },
    2: { label: intl.formatMessage({ id: "register.pw_strength.fair" }),  color: "#f97316" },
    3: { label: intl.formatMessage({ id: "register.pw_strength.good" }),  color: "#eab308" },
    4: { label: intl.formatMessage({ id: "register.pw_strength.strong" }), color: "#22c55e" },
  };

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

  const strength          = getStrength(form.password, strengthMap);
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
      setError(err.response?.data?.message || intl.formatMessage({ id: "register.error" }));
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
              <S.SuccessTitle>{intl.formatMessage({ id: "register.success.title" })}</S.SuccessTitle>
              <S.SuccessText>
                {intl.formatMessage({ id: "register.success.text" })}<br/>
                <strong style={{ color: S.tokens.text }}>{form.email}</strong>
              </S.SuccessText>
              <S.CardFooter style={{ marginTop: 24 }}>
                <Link to="/login">{intl.formatMessage({ id: "register.success.login" })}</Link>
              </S.CardFooter>
            </S.SuccessBox>

          ) : (
            <>
              {/* ── Heading ── */}
              <S.Title>{intl.formatMessage({ id: "register.title" })}</S.Title>
              <S.Subtitle>{intl.formatMessage({ id: "register.subtitle" })}</S.Subtitle>

              {/* ── Social buttons ── */}
              <S.SocialsGrid>
                <S.SocialButton type="button"><GoogleIcon /> Google</S.SocialButton>
                <S.SocialButton type="button"><FacebookIcon /> Facebook</S.SocialButton>
              </S.SocialsGrid>

              {/* ── Divider ── */}
              <S.Divider>
                <S.DividerLine />
                <S.DividerText>{intl.formatMessage({ id: "common.or" })}</S.DividerText>
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
                  <label htmlFor="username">{intl.formatMessage({ id: "register.username_label" })}</label>
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
                    <label htmlFor="firstName">{intl.formatMessage({ id: "register.firstname_label" })}</label>
                    <S.Input
                      id="firstName"
                      type="text"
                      placeholder={intl.formatMessage({ id: "register.firstname_placeholder" })}
                      value={form.firstName}
                      onChange={set("firstName")}
                      autoComplete="given-name"
                      required
                    />
                  </S.Field>
                  <S.Field>
                    <label htmlFor="lastName">{intl.formatMessage({ id: "register.lastname_label" })}</label>
                    <S.Input
                      id="lastName"
                      type="text"
                      placeholder={intl.formatMessage({ id: "register.lastname_placeholder" })}
                      value={form.lastName}
                      onChange={set("lastName")}
                      autoComplete="family-name"
                      required
                    />
                  </S.Field>
                </S.FieldRow>

                {/* Email */}
                <S.Field>
                  <label htmlFor="email">{intl.formatMessage({ id: "register.email_label" })}</label>
                  <S.Input
                    id="email"
                    type="email"
                    placeholder={intl.formatMessage({ id: "register.email_placeholder" })}
                    value={form.email}
                    onChange={set("email")}
                    autoComplete="email"
                    required
                  />
                </S.Field>

                {/* Mot de passe */}
                <S.Field>
                  <label htmlFor="password">{intl.formatMessage({ id: "register.password_label" })}</label>
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
                      aria-label={showPw ? intl.formatMessage({ id: "register.hide_password" }) : intl.formatMessage({ id: "register.show_password" })}
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
                  <label htmlFor="confirmPassword">{intl.formatMessage({ id: "register.confirm_password_label" })}</label>
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
                      aria-label={showConfirm ? intl.formatMessage({ id: "register.hide_password" }) : intl.formatMessage({ id: "register.show_password" })}
                    >
                      <EyeIcon open={showConfirm} />
                    </S.TogglePasswordButton>
                  </S.InputWrap>

                  {passwordsMatch && (
                    <S.MatchHint $ok><CheckIcon /> {intl.formatMessage({ id: "register.pw_match" })}</S.MatchHint>
                  )}
                  {passwordsMismatch && (
                    <S.MatchHint><CrossIcon /> {intl.formatMessage({ id: "register.pw_mismatch" })}</S.MatchHint>
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
                    {intl.formatMessage({ id: "register.terms_prefix" })}{" "}
                    <a href="#">{intl.formatMessage({ id: "register.terms_link" })}</a> {intl.formatMessage({ id: "register.terms_and" })}{" "}
                    <a href="#">{intl.formatMessage({ id: "register.privacy_link" })}</a> {intl.formatMessage({ id: "register.terms_suffix" })}
                  </span>
                </S.TermsRow>

                {/* Submit */}
                <S.SubmitButton
                  type="submit"
                  disabled={loading || !form.terms || !!passwordsMismatch}
                >
                  {loading ? <S.Spinner /> : intl.formatMessage({ id: "register.submit" })}
                </S.SubmitButton>
              </form>

              {/* Footer */}
              <S.CardFooter>
                {intl.formatMessage({ id: "register.already_account" })} <Link to="/login">{intl.formatMessage({ id: "register.login_link" })}</Link>
              </S.CardFooter>
            </>
          )}

        </S.Card>
      </S.Page>
    </>
  );
}
