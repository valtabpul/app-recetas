import nodemailer from "nodemailer";

//trasmisor con las llaves del .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    await transporter.sendMail({
      from: `"Recetario Maestro" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "¡Bienvenida a tu nuevo recetario favorito! 🍳",
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #4A4A4A; max-width: 600px; margin: 0 auto; background-color: #FFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 2px solid #FCE4EC;">
            <div style="background-color: #F8BBD0; padding: 35px 20px; text-align: center;">
              <h1 style="color: #AD1457; margin: 0; font-size: 32px; letter-spacing: -0.5px;">🍰 Recetario Maestro</h1>
            </div>
            <div style="padding: 40px 30px; background-color: #FFF0F5;">
              <h2 style="color: #D81B60; font-size: 26px; margin-top: 0;">¡Hola, ${userName}! 🌸</h2>
              <p style="font-size: 16px; line-height: 1.7; color: #880E4F;">
                Gracias por unirte a nuestra dulce comunidad. Estamos súper felices de que empieces a guardar y compartir tus platos favoritos con nosotros.
              </p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #E91E63; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);">
                  Explorar Recetas ✨
                </a>
              </div>
              <p style="font-size: 16px; line-height: 1.7; color: #880E4F; margin-bottom: 0;">
                ¡Prepara tu cocina, porque cosas deliciosas están por venir!
              </p>
            </div>
            <div style="background-color: #FCE4EC; padding: 25px; text-align: center; border-top: 2px solid #F8BBD0;">
              <p style="margin: 0; font-size: 13px; color: #D81B60; font-weight: 500;">
                © ${new Date().getFullYear()} Recetario Maestro.<br>Diseñado con mucho amor y dulzura. 🩷
              </p>
            </div>
          </div>
        `,
    });
    console.log(`Correo de bienvenida enviado exitosamente a ${userEmail}`);
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
}