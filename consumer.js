const amqp = require("amqplib");

connect = async ()=>{
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
       
        channel.consume("jobs", message=>{
            const JsonString = JSON.parse(message.content.toString());
            console.log(`Received the number with input ${JsonString.number}`);

            if (JsonString.number==100) {
                console.log("done!");
                channel.ack(message);
            }
        })

        console.log("Waiting for messages...");

    } catch (error) {
        console.log(error);
    }
}

connect();
