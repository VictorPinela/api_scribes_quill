import crypto from "crypto";
import { User } from "../models/User";
import { emailService } from "./emailService";

export const verificationService = {
  generateVerificationToken(): string {
    return crypto.randomBytes(32).toString("hex");
  },

  async createUserWithVerification(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const verificationToken = this.generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    const user = new User({
      ...userData,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    await user.save();
    await emailService.sendVerificationEmail(userData.email, verificationToken);

    return user;
  },

  async verifyEmail(token: string) {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error("Token de verificação inválido ou expirado");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();
    await emailService.sendWelcomeEmail(user.email, user.name);

    return user;
  },

  async resendVerificationEmail(email: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.isVerified) {
      throw new Error("Email já verificado");
    }

    const verificationToken = this.generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;

    await user.save();
    await emailService.sendVerificationEmail(email, verificationToken);

    return user;
  },
};
