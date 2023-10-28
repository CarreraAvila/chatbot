const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Esto se ejeuta cunado la persona escruibe "salir"
 */
const flowSalir = addKeyword(["salir", "Salir", "SALIR", "Exit", "exit"])
  .addAnswer(
   "Gracias por utilizar el ChatBot del #GFCoconal"
  )
  .addAction(async (ctx, {endFlow }) => {
    return endFlow()
  })


module.exports = flowSalir;
