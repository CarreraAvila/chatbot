const EXTERNAL_USER = process.env.EXTERNAL_USER ?? "";
const EXTERNAL_PASS = process.env.EXTERNAL_PASS ?? "";


const pool = require("../../../db/db");


const login = async () => {
  const apiResponse = await fetch(
    `https://api.codigoencasa.com/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: EXTERNAL_USER, password: EXTERNAL_PASS }),
    }
  );

  const data = await apiResponse.json();
  return data.data.access_token;
};

const exchange = async (courseID = "", email = "") => {
  const token = await login();
  const apiResponse = await fetch(
    `https://api.codigoencasa.com/v1/points/redeem`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseID, email }),
    }
  );

  const data = await apiResponse.json();
  return data.statusCode;
};

const register = async (email) => {
  const apiResponse = await fetch(
    `https://api.codigoencasa.com/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:'Custom WS',
        description: 'Soy un comprador desde el Bot de WS',
        email,
        password:`soy_chatbot_${Date.now()}`,
        byRefCode: "LEIFERMENDEZ",
      }),
    }
  );
}

  const registerUsers = async (email, phone, status, name, categoria, rama) => {
    try {
      
       const result =  await pool.query(`INSERT INTO railway.users(name, phone, email, status, categoria, rama)VALUES ('${name}', '${phone}','${email}','${status}','${categoria}','${rama}')`)
      // const data = await result.json();
      console.log(result[0].insertId)
      return result;  
    } catch (error) {
      console.log(error);
      return error;
    }
    
};

const findUsers = async (phone) => {
  try {
    
     const result =  await pool.query(`SELECT  a.*, b.description, CASE WHEN a.rama = 'F' THEN "Femenil" ELSE "Varonil" END AS ramadescription  FROM railway.users a INNER JOIN railway.categorias b ON b.idcategorias = a.categoria where a.phone = '${phone}';`)
    // const data = await result.json();
    
    return result;  
  } catch (error) {
    console.log(error);
    return error;
  }
  
};

const rechargePoint = async (points = 0, userId = "") => {
  const token = await login();
  const apiResponse = await fetch(`https://api.codigoencasa.com/v1/points`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      amount: points,
      platform: "stripe",
      description: "Compra especial desde BOT WS",
      status: "success",
    }),
  });

  const data = await apiResponse.json();
  return data;
};

module.exports = { login, rechargePoint, exchange, register, registerUsers, findUsers };
