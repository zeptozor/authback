import { Transporter, createTransport } from "nodemailer";

interface MailerOptions {
    host: string
    port: number
    auth: {
        user: string
        pass: string
    }
    secure?: boolean
}

export class Mailer {
    transporter: Transporter
    options: MailerOptions
    constructor(options: MailerOptions) {
        this.options = options
        this.transporter = createTransport({
            host: this.options.host,
            port: this.options.port,
            auth: {
                user: this.options.auth.user,
                pass: this.options.auth.pass
            },
            secure: this.options.secure || false
        })
    }

    async sendOTP(to: string, otp: number) {
        await this.transporter.sendMail({
            from: this.options.auth.user,
            to,
            text: `Ваш код: ${otp}`,
            subject: 'Подтвердите вашу почту для авторизации на onesim.co'
        })
    }
}