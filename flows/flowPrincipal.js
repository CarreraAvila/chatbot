const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowConvocatoria = require("../flows/flowConvocatoria");
const flowSendLink = require("../flows/linkPay");
const flowPoster = require("../flows/flowPoster");
const flowInfo = require("../flows/flowInfo");


const flowPrincipal = addKeyword(EVENTS.WELCOME)
.addAction(
  async (ctx, { state }) => {
      await state.update({ flujo: 'flowPrincipal' })
      
  }
)
  .addAnswer([ "Bienvenido al ChatBot del *Gran Fondo Coconal*", "Evento para los amantes del ciclismo. Recorrer la autopista DURANGO-TORREÓN en CARRERA 200K "])
  .addAnswer(
    [
        "¿Como podemos ayudarte?",
        "",
        "*1* Ver Convocatoria",
        "*2* Ver Poster Oficial",
        "*3* Preguntar información",
        "*4* Inscripción",
    ]
  )  
  .addAnswer(
    'Responda con el numero de la opcion!',
    {
        capture: true,
    },
    async (ctx, {gotoFlow, state }) => {
        await state.update({ option: ctx.body })

        switch (ctx.body) {
          case '1':
            await gotoFlow(flowConvocatoria);
            break;
          case '2':
            await gotoFlow(flowPoster);
            break;
          case '3':
            await gotoFlow(flowInfo);
            break;
          case '4':
            await gotoFlow(flowSendLink);
            break;
        }
    }
  )

module.exports = flowPrincipal;