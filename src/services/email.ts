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
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>¡Hola, ${userName}!</h2>
          <p>Gracias por unirte a nuestra comunidad. Estamos felices de que empieces a guardar tus platos favoritos.</p>
          <p>Explora nuestro catálogo para descubrir recetas increíbles y guardarlas en tu perfil.</p>
        </div>
      `,
    });
    console.log(`Correo de bienvenida enviado exitosamente a ${userEmail}`);
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
}