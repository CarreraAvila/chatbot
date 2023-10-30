const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { info } = require("../services/info");



module.exports = addKeyword(EVENTS.ACTION)
.addAction(
    async (ctx, { state }) => {
        await state.update({ flujo: 'flowInfo' })
        
    }
  )

    .addAnswer(
        `Haz tu pregunta aqui y trataremos de resolver tus dudas del GFCOCONAL`,
        { capture: true },
        async (ctx, { fallBack, state, flowDynamic, gotoFlow, extensions }) => {
            console.log(ctx.body)


            await flowDynamic("⏱️")
            const response = await info(ctx.body);
            await flowDynamic(response)
            await flowDynamic([
                "Escribe *menu* para volver al menu",
                "Escribe *salir* para salir del chatbot",
            ])
        }
    );