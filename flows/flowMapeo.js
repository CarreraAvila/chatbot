const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flowSendLink = require("./linkPay");





const flowMapeo = addKeyword(EVENTS.ACTION)
.addAction(
  async (ctx, { state }) => {
      await state.update({ flujo: 'flowMapeo' })
      
  }
)

  .addAction(
    async (ctx, { state, flowDynamic, gotoFlow }) => {
      const find = await findUsers(ctx.from);
      const username = (find[0][0]!= undefined) ? find[0][0].name:''
      if (find[0][0]!= undefined) {
        await state.update({ name: find[0][0].name})
        await state.update({ status: find[0][0].status})
        await state.update({ categoria: find[0][0].description})
        await state.update({ rama: find[0][0].ramadescription})
        await flowDynamic([`Hola ${username} `, `Ya estas inscrito a: ${find[0][0].description} en la rama ${find[0][0].ramadescription}`]);

      }else{
        await gotoFlow(flowSendLink);
      }
      


    }
  )
  .addAnswer(
    [
      "Escribe *menu* para volver al menu",
      "Escribe *salir* para salir del chatbot",
    ]
  ) 
  

module.exports = flowMapeo;