import emailjs from "@emailjs/browser";

export interface EmailParams {
    name: string;
    email: string;
    subject: string;
    message: string;
    [key: string]: unknown;
}

export class EmailService {
    private static getCredentials() {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.warn("EmailJS warning: Credentials not fully configured in environment variables.", {
                serviceId: !!serviceId,
                templateId: !!templateId,
                publicKey: !!publicKey,
            });
        }

        return { serviceId, templateId, publicKey };
    }

    /**
     * Sends an email via EmailJS client
     * @param params EmailParams containing user name, email, subject, and message
     */
    public static async sendEmail(params: EmailParams): Promise<void> {
        const { serviceId, templateId, publicKey } = this.getCredentials();

        if (!serviceId || !templateId || !publicKey) {
            throw new Error(
                "Email settings are not configured. Please define EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY."
            );
        }

        try {
            const templateParams = {
                from_name: params.name,
                reply_to: params.email,
                subject: params.subject,
                message: params.message,
            };

            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            if (response.status !== 200) {
                throw new Error(`EmailJS responded with status ${response.status}: ${response.text}`);
            }
        } catch (error) {
            console.error("Error sending email via EmailJS:", error);
            throw error;
        }
    }
}
