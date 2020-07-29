'use strict'

const lodash = require('lodash')
const { v4 : uuidv4 } = require('uuid')
const mongoose      = require('./mongoose')
const config        = require('./config')
const express       = require('express')
const logger        = require('morgan')
const amqp  = require('amqplib/callback_api')
const cors          = require('cors')

const app = express()
app.use(express.json())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

if (config.env === 'development') {
  app.use(logger('dev'))
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

let amqp_url = 'amqp://mivclhnw:vES-jPTDO-7qAaAY8fgzKRvMBeCAjbVY@rhino.rmq.cloudamqp.com/mivclhnw'
let queue = 'hello';

function processMsg(msg) {
  let result = msg.content.toString()
  console.log(" [x] Received %s", result);
  //update status
  if (result == "declined")
      status = "cancelled"
  else
      status = "confirmed"
  mongoose.findOneAndUpdate({"name": order.name}, {$set:{"status": status}}, {},
    (err, data) => {
      if (err)
        console.log('find error1')
      else
        console.log(data)
    })
}

function sendQ(arg) {
  amqp.connect(amqp_url, function(err, connection) {
    let hoChannel;
    let status;
    if (err) {
        console.error("[AMQP]", err.message);;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let msg = arg.name;
        hoChannel = channel

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);

        channel.consume(queue,
          processMsg,
          {
            noAck: true
          }
        );
    });

    setTimeout(function() {
        // if confirmed, auto set status to delivered
        if (status == "confirmed") {
          mongoose.findOneAndUpdate({"name": order.name}, {$set:{"status": "delivered"}}, {},
           (err, data) => {
            if (err)
              console.log('find error1')
            else
              console.log(data)
          })
        }
        connection.close();
    }, 1000);
  });
}

app.post('/api/order', (req, res) => {
  console.log(req.body);
  if (isEmptyObject(req.body)) {
    res.status(400);
    res.send('bad request');
  }
  if (req.body) {
    let order = req.body
    let data0 = new mongoose({ name: order.name, amount: order.amount, state: 'Created'})
    // save to db
    data0.save((err) => {
      if (err) {
        console.log('mongo save error1');
        res.status(400)
        res.json({"result":"not success"})
      }
      else {
        res.status(200)
        res.json({"result":"created"})
        //res.send({"result":"success"})
        //send order to payment app
        sendQ(order)
      }
    })
  }
});

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`)
})

module.exports = app
