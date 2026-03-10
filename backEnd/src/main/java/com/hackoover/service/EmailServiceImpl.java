package com.hackoover.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    public void sendVerificationEmail(String to, String username, String token) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Hackoover - Confirmez votre email");

            String verificationUrl = frontendUrl + "/verify-email?token=" + token;

            String htmlContent = """
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                            <h1 style="color: #333;">Bienvenue sur Hackoover, %s !</h1>
                            <p style="color: #666; font-size: 16px;">
                                Merci de vous être inscrit sur Hackoover. Pour activer votre compte, 
                                veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="%s" 
                                   style="background-color: #4CAF50; color: white; padding: 15px 30px; 
                                          text-decoration: none; border-radius: 5px; display: inline-block;">
                                    Confirmer mon email
                                </a>
                            </div>
                            <p style="color: #999; font-size: 14px;">
                                Ce lien expirera dans 24 heures.<br>
                                Si vous n'avez pas créé de compte, ignorez cet email.
                            </p>
                        </div>
                    </body>
                    </html>
                    """.formatted(username, verificationUrl);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
}
