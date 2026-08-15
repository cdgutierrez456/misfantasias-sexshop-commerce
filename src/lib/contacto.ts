// Formato internacional sin + ni espacios: es lo que exige wa.me.
// 57 = Colombia.
const WHATSAPP = "573002589814";

export const MARCA = "Mis Fantasías";
export const SUBMARCA = "Sex Shop";
export const TELEFONO = "300 258 9814";
export const CIUDAD = "Manizales, Caldas — Colombia";
export const HORARIO = "Lun a sáb · 10:00 a 20:00";

// Mensaje estándar de todo botón de WhatsApp que no cuelga de un producto:
// header, hero, botón flotante, footer, envío discreto. Los botones de
// producto siguen armando el suyo con nombre, talla, cantidad y precio.
export const MENSAJE_GENERAL = `¡Hola ${MARCA}! Quiero asesoría sobre sus productos 💋`;

export const whatsappUrl = (mensaje: string = MENSAJE_GENERAL) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

export const REDES = {
  instagram:
    "https://www.instagram.com/scale.automatization/?utm_source=ig_web_button_share_sheet",
  // ponytail: sin página propia todavía; apunta al inicio de Facebook.
  facebook: "https://facebook.com",
};
