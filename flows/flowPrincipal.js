const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowConvocatoria = require("../flows/flowConvocatoria");
const flowSendLink = require("../flows/linkPay");
const flowPoster = require("../flows/flowPoster");
const flowInfo = require("../flows/flowInfo");
const flowSecondary = require("../flows/flowSecondary");
const { findUsers } = require("../http/services/e-learning");




const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAction(
   
    async (ctx, { state, gotoFlow }) => {
      console.log(ctx)
      
      const currentState = state.getMyState();
      if (currentState!=undefined){
        if (currentState.flujo !== 'flowPrincipal')

          await gotoFlow(flowSecondary);
      }else{
        await state.update({ flujo: 'flowPrincipal' })
      }
    }
  )

  .addAction(
    async (ctx, { state, flowDynamic }) => {
      const find = await findUsers(ctx.from);
      const username = (find[0][0]!= undefined) ? find[0][0].name:''
      if (find[0][0]!= undefined) {
        await state.update({ name: find[0][0].name})
        await state.update({ status: find[0][0].status})
        await state.update({ categoria: find[0][0].description})
        await state.update({ rama: find[0][0].ramadescription})
        await flowDynamic([`Hola ${username} `, `Ya estas inscrito a: ${find[0][0].description} en la rama ${find[0][0].ramadescription}`]);

      }else{
        await flowDynamic([`Bienvenido al ChatBot del 🏁*Gran Fondo Coconal*🏁`]);
      }
      


    }
  )
  
  .addAnswer(
    [
      "¿Como podemos ayudarte?",
      "",
      "*1* Ver Convocatoria 🚴‍♀️",
      "*2* Ver Poster Oficial 🖼️",
      "*3* Preguntar información 🔎",
      "*4* Inscripción  💳",
    ]
  )
  .addAnswer(
    'Responda con el numero de la opcion!',
    {
      capture: true,
    },
    async (ctx, { gotoFlow, state }) => {
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