const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowConvocatoria =  addKeyword(EVENTS.ACTION)
.addAction(
  async (ctx, { state }) => {
      await state.update({ flujo: 'flowConvocatoria' })
      
  }
)

.addAnswer('Esta es la convocatoria del evento GFCOCONAL 2023')
.addAnswer("⏱️")
.addAnswer('_', {
  media: './assets/CONVOCATORIA_GFCOCONAL_2023.pdf',
})
.addAnswer(
  [
    "Escribe *menu* para volver al menu",
    "Escribe *salir* para salir del chatbot",
  ]
) 

module.exports = flowConvocatoria;