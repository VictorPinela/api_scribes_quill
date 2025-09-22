import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const emailService = {
  async sendVerificationEmail(email: string, token: string) {
    const transporter = createTransporter();

    const verificationUrl = `http://localhost:5173/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@scribesquill.com",
      to: email,
      subject: "Verifique seu email - Scribe's Quill",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Bem-vindo ao Scribe's Quill! 🏰</h2>
          <p>Olá! Obrigado por se cadastrar. Para começar a usar sua conta, precisamos verificar seu email.</p>
          <p>Clique no botão abaixo para verificar seu endereço de email:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #1e40af; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
            Verificar Email
          </a>
          <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>Este link expira em 24 horas.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          <p style="color: #666; font-size: 14px;">
            Se você não se cadastrou no Scribe's Quill, ignore este email.
          </p>
        </div>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  },

  async sendWelcomeEmail(email: string, name: string) {
    // Implementar email de boas-vindas após verificação
  },
};
