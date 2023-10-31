require("dotenv").config();

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const ServerAPI = require("./http");

/**
 * ChatGPT
 */
// const ChatGPTClass = require("./chatgpt.class");
// const chatGPT = new ChatGPTClass();
/**
 * Flows
 */
const flowPrincipal = require("./flows/flowPrincipal");
const flowSecondary = require("./flows/flowSecondary");
const flowSalir = require("./flows/flowSalir");
const flowPoster = require("./flows/flowPoster");
const flowSendLink = require("./flows/linkPay");
const fallBackEmail = require("./flows/fallBackEmail");
const flowInfo = require("./flows/flowInfo");
const flowConvocatoria = require("./flows/flowConvocatoria");

// const { flowReparacion } = require("./flows/flowReparacion");
// const { flowOfertas } = require("./flows/flowOfertas");


const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([
        flowPrincipal,
        flowSecondary,
        flowSalir,
        flowSendLink,
        fallBackEmail,
        flowInfo,
        flowPoster,
        flowConvocatoria,
        
        // flowReparacion(chatGPT),
        // flowOfertas(chatGPT),
      ]);
    const adapterProvider = createProvider(BaileysProvider)
    const httpServer = new ServerAPI(adapterProvider, adapterDB);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }, {
        blackList: ['526181570505'],
    })

    //QRPortalWeb()
    httpServer.start();

}

main()
