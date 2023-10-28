const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowMap = require("./flowMap");

const flowPrincipal = addKeyword(['menu'])
  .addAnswer(
    [
        "*1* Ver Convocatoria",
        "*2* Ver Poster Oficial",
        "*3* Preguntar información",
        "*4* Inscripción",
    ]
  )  
  // .addAnswer(
  //   'Responda con el numero de la opcion!',
  //   {
  //       capture: true,
  //   },
  //   async (ctx, {gotoFlow, state }) => {
  //       await state.update({ option: ctx.body })

  //       await gotoFlow(flowMap)
  //   }
  // )

module.exports = flowPrincipal;