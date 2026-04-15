import nodemailer from 'nodemailer';

export const sendEmailNotification = async (lead) => {
  try {
    // Note: To make this work, configure EMAIL_USER and EMAIL_PASS in your Replit secrets
    // EMAIL_PASS needs to be a Gmail "App Password" if using Gmail.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '', // Needs setting in prod
        pass: process.env.EMAIL_PASS || '', // Needs setting in prod
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@uniglobal.co.in',
      to: 'mfk07860@gmail.com', // Permanently sending leads here
      subject: `🚨 New Lead: ${lead.name}`,
      text: `A new student has submitted a consultation request!\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nDegree: ${lead.degree || 'N/A'}\nCountry Preference: ${lead.country || 'N/A'}\nBudget: ${lead.budget || 'N/A'}\nIntake: ${lead.intake || 'N/A'}`,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email notification successfully sent to mfk07860@gmail.com');
      return { success: true };
    } else {
      console.log('⚠️ Email notification skipped: EMAIL_USER or EMAIL_PASS not configured.');
      return { success: false, reason: 'Credentials not configured' };
    }
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    return { success: false, error: error.message };
  }
};
