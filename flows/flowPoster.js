const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPoster =  addKeyword(EVENTS.ACTION)
.addAction(
  async (ctx, { state }) => {
      await state.update({ flujo: 'flowPoster' })
      
  }
)
.addAnswer('Este es el poster oficial del GFCOCONAL 2023')
.addAnswer("⏱️")
.addAnswer('_', {
  media: './assets/PosterGFC_2023.jpg',
})
.addAnswer(
  [
    "Escribe *menu* para volver al menu",
    "Escribe *salir* para salir del chatbot",
  ]
) 
 module.exports = flowPoster;