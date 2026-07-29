export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            message: "Method not allowed"
        });

    }


    const { date, time, place } = req.body;


    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;


    const text = `
❤️ پاسخ جدید

📅 تاریخ:
${date}

🕒 ساعت:
${time}

📍 مکان:
${place}
    `;


    const telegramUrl =
        `https://api.telegram.org/bot${token}/sendMessage`;


    try {

        const response = await fetch(telegramUrl, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                chat_id: chatId,

                text: text

            })

        });


        const data = await response.json();


        return res.status(200).json(data);


    } catch(error) {


        return res.status(500).json({

            error: error.message

        });


    }

}