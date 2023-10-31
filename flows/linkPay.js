const { addKeyword, EVENTS  } = require("@bot-whatsapp/bot");

const fallBackEmailFlow = require('../flows/fallBackEmail');
const { handlerStripe } = require("../services/stripe");






module.exports = addKeyword(EVENTS.ACTION)
.addAction(
  async (ctx, { state }) => {
      await state.update({ flujo: 'flowSendLink' })
      
  }
)

    .addAnswer(
      '¿Cual es tu Nombre Completo incluye Apellidos?',
      {
          capture: true,
      },
      async (ctx, { flowDynamic, state }) => {
          await state.update({ name: ctx.body })
          flowDynamic('Gracias por tu nombre!')
      }
  )
.addAnswer(
  [
    "¿Qué Categoria vas a pagar?",
    "",
    "*1* 200k Ruta",
    "*2* 200k MTB Intermedios Libre",
    "*3* 200k MTB Avanzados Libre",
    "******** PASEO ***********",
    "*4* 200k Libre",
    "*5* 100k Libre",
]
)
.addAnswer(
  'Responda con el numero de la opcion!',
  {
      capture: true,
  },
  async (ctx, {state}) => {
      await state.update({ categoria: ctx.body })
  }
).addAnswer(
  [
    "¿Rama?",
    "",
    "*F* Femenil",
    "*V* Varonil"
]
)
.addAnswer(
  'Responda con el *F* o *V* ',
  {
      capture: true,
  },
  async (ctx, {state}) => {
    await state.update({ rama: ctx.body })
}
)
.addAnswer(
  `Solo un dato más ¿Cual es tu email?`,
  { capture: true },
  async (ctx, { fallBack, state, flowDynamic, gotoFlow, extensions }) => {
    console.log(ctx.body)
    
      const adapterDB = extensions.database
      const currentState = state.getMyState();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const email = ctx.body;
      const fallBackEmail = currentState?.fallBackEmail ?? 0

      if (!emailRegex.test(email)) {
          if (fallBackEmail > 2) {
              return gotoFlow(fallBackEmailFlow)
          }

          state.update({ fallBackEmail: fallBackEmail + 1 })
          return fallBack("Debes introducir un email valido");
      }
      state.update({ email:email.toLowerCase() });
      await flowDynamic(`dame un momento para generarte un link de pago`); 
      const response = await handlerStripe(ctx.from, email, currentState.name, currentState.categoria, currentState.rama);
      state.update({ answer: "" });
      const msgLinkPay = `Este es tu link: ${response.url}`
      await flowDynamic(msgLinkPay);

  }
);


