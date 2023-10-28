


const info = async (question) => {
  let headersList = {
    "x-api-key": process.env.CHATPDF_API_KEY,
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "sourceId": process.env.SOURCE_ID,
     "messages": [
       {
         "role": "user",
         "content": question
       }
     ]
   });
   
   let response = await fetch("https://api.chatpdf.com/v1/chats/message", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.text();
   let dataParse = JSON.parse(data);
  return dataParse.content;
};


module.exports = { info};
