export interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
}

async function sendEmail(env: Env, subject: string, html: string, replyTo?: string) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Pest Free Services <noreply@pestfreeservices.co.za>',
      to: 'pestfreeservices@gmail.com',
      subject,
      reply_to: replyTo || undefined,
      html
    })
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/bookings') {
      const booking: any = await request.json();
      const reference = `PFS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const emailRes = await sendEmail(
        env,
        `New Booking Request — Ref ${reference}`,
        `<h2>New Booking Request</h2>
         <p><strong>Reference:</strong> ${reference}</p>
         <p><strong>Name:</strong> ${booking.name || 'N/A'}</p>
         <p><strong>Email:</strong> ${booking.email || 'N/A'}</p>
         <p><strong>Phone:</strong> ${booking.phone || 'N/A'}</p>
         <p><strong>Address:</strong> ${booking.address || 'N/A'}</p>
         <p><strong>Message:</strong> ${booking.message || 'N/A'}</p>`,
        booking.email
      );

      if (!emailRes.ok) {
        return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), { status: 500 });
      }

      return new Response(JSON.stringify({
        success: true,
        reference,
        message: "Booking received successfully! Grant will contact you shortly to confirm the appointment."
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (request.method === 'POST' && url.pathname === '/api/contact') {
      const contact: any = await request.json();

      const emailRes = await sendEmail(
        env,
        `New Contact Inquiry from ${contact.name || 'Website Visitor'}`,
        `<h2>New Contact Inquiry</h2>
         <p><strong>Name:</strong> ${contact.name || 'N/A'}</p>
         <p><strong>Email:</strong> ${contact.email || 'N/A'}</p>
         <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
         <p><strong>Message:</strong> ${contact.message || 'N/A'}</p>`,
        contact.email
      );

      if (!emailRes.ok) {
        return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), { status: 500 });
      }

      return new Response(JSON.stringify({
        success: true,
        message: "Thank you for contacting Pest Free Services Durban. Grant Arnold will respond to your message shortly."
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Not an API call — serve the built static site
    return env.ASSETS.fetch(request);
  }
};
