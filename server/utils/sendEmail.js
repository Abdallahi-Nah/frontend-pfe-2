// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1)- Créer un transporteur (service qui enverra l'e-mail, comme "gmail")
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "587", 10),
        service: process.env.SMTP_SERVICE,
        secure: true, // Utilise SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // Ignore les erreurs de certificat auto-signé
        },
    });

    // Activer les logs de débogage
    transporter.verify((error, success) => {
        if (error) {
            console.error("Erreur de vérification du transporteur :", error);
        } else {
            console.log("Le transporteur est prêt à envoyer des e-mails");
        }
    });

    // 2)- Définir les options de l'e-mail (expéditeur, destinataire, sujet, contenu)
    const mailOpts = {
        from: "E-Learning App <abdallahi.nah.un.fst@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3)- Envoyer l'e-mail
    try {
        const info = await transporter.sendMail(mailOpts);
        console.log("E-mail envoyé avec succès :", info.messageId);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
};

module.exports = sendEmail;