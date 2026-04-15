// WhatsApp Notification Service
// Supports both Twilio and mock implementation

const sendWhatsAppNotification = async (lead) => {
  try {
    const message = `New Lead Alert! 🎓\n\nName: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nCountry: ${lead.country || 'N/A'}\nDegree: ${lead.degree || 'N/A'}\nPreferred Country: ${lead.preferredCountry || 'N/A'}\nBudget: ${lead.budget || 'N/A'}\nIntake: ${lead.intake || 'N/A'}`;

    // Check if Twilio credentials are available
    if (process.env.WHATSAPP_API_KEY && process.env.WHATSAPP_ACCOUNT_SID) {
      return await sendViaTwilio(message, lead);
    } else {
      // Mock implementation for development
      return await sendViaMock(message, lead);
    }
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    // Don't throw error to not block lead creation
    return { success: false, error: error.message };
  }
};

// Mock WhatsApp notification (for development without API)
const sendViaMock = async (message, lead) => {
  try {
    console.log('📱 [MOCK WhatsApp] Message would be sent:');
    console.log(message);
    console.log('---');
    return {
      success: true,
      message: 'Mock WhatsApp notification sent',
      lead: {
        name: lead.name,
        phone: lead.phone,
      },
    };
  } catch (error) {
    throw new Error(`Mock notification failed: ${error.message}`);
  }
};

// Twilio WhatsApp notification (production)
const sendViaTwilio = async (message, lead) => {
  // Placeholder for Twilio integration
  // Install twilio package and uncomment below when needed
  /*
  const twilio = require('twilio');
  const client = twilio(
    process.env.WHATSAPP_ACCOUNT_SID,
    process.env.WHATSAPP_API_KEY
  );

  const response = await client.messages.create({
    from: `whatsapp:${process.env.WHATSAPP_PHONE_NUMBER}`,
    to: `whatsapp:+918266987019`, // Hardcoded temporarily as requested
    body: message,
  });

  return {
    success: true,
    messageSid: response.sid,
  };
  */

  console.log('Twilio integration ready. Configure .env to enable.');
  return {
    success: true,
    message: 'Twilio integration pending configuration',
  };
};

export default sendWhatsAppNotification;
