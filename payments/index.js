'use strict'

const lodash = require('lodash')
const { v4 : uuidv4 } = require('uuid')
const mongoose      = require('./mongoose')
const config        = require('./config')
const express       = require('express')
const logger        = require('morgan')
const amqp          = require('amqplib/callback_api')

const app = express()
app.use(express.json())

if (config.env === 'development') {
  app.use(logger('dev'))
}

let amqp_url = 'amqp://mivclhnw:vES-jPTDO-7qAaAY8fgzKRvMBeCAjbVY@rhino.rmq.cloudamqp.com/mivclhnw'
let queue = 'hello';

function processMsg(msg) {
  console.log(" [x] Received %s", msg.content.toString());
  try {
      //random payment result
      let result = Math.random() * (10 - 1) + 1
      if (result > 5 && result <= 10)
      // send status to order
        channel.sendToQueue(queue, "confirmed");
      else    
        channel.sendToQueue(queue, "declined");
  } catch (e) {
      closeOnErr(e);
  }
}

amqp.connect(amqp_url+ "?heartbeat=60", function(err, connection) {
    if (err) {
        console.error("[AMQP]", err.message);
    }
    if ( typeof connection !== 'undefined' && connection ) {    
      connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, 
           processMsg,
           {
            noAck: true
        });
      });
    }
});

exports.default = app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`)
})
