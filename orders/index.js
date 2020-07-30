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
let queue = 'sendToPayment';
let amqpConn = null;
let order
let timer

amqp.connect(amqp_url, function(err, connection) {
  if (err) {
      console.error("[AMQP]", err.message);;
  }
  consumer(connection)
  amqpConn = connection
  //publisher(conn)
})

function processMsg(msg) {
  let result = msg.content.toString()
  let status
  console.log(" [x] Received %s", result);
  //update status
  if (result == "declined")
      status = "cancelled"
  else
      status = "confirmed"

  mongoose.findOneAndUpdate({"name": order.name}, {"state": status}, {new: true},
    (err, data) => {
      if (err)
        console.log('find error1')
      else
        console.log(data)
    })

  timer = setTimeout(function() {
      // if confirmed, auto set status to delivered
      if (status == "confirmed") {
        mongoose.findOneAndUpdate({"name": order.name}, {$set:{"state": "delivered"}}, {new: true},
          (err, data) => {
          if (err)
            console.log('find error1')
          else
            console.log(data)
        })
      }
    }, 10000);
}

function publisher(arg) {
  if (amqpConn != null) {
    amqpConn.createChannel(function(error1, channel) {
      if (error1) {
          throw error1;
      }

      let msg = arg.name;

      channel.assertQueue(queue, {
          durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(" [x] Sent %s", msg);
    })
  }
}

function consumer(connection) {
  connection.createChannel(function(error1, channel) {
      if (error1) {
          throw error1;
      }

      channel.assertQueue(queue, {
          durable: false
      });
      channel.consume(queue,
        processMsg,
        {
          noAck: true
        }
      );
      //connection.close();
    })
}

app.get('/api/orderstatus/:name', (req, res) => {
  console.log(req.params.name)
  mongoose.findOne({"name": req.params.name},
    (err, data) => {
    if (err) {
      console.log('find error1')
      res.status(401)
      res.json({"result":"not success"})
    }
    else {
      console.log('find success')
      console.log(data)
      res.status(200)
      res.json({"result": data.state})
    }
  })
})

app.post('/api/ordercancel', (req, res) => {
  console.log(req.body)
  if (isEmptyObject(req.body)) {
    res.status(400);
    res.send('bad request')
  }
  if (req.body) {
    order = req.body
    mongoose.findOneAndUpdate({"name": order.name}, {"state": "cancelled"}, {new: true},
      (err, data) => {
        if (err) {
          console.log('cancel error1')
          res.status(401)
          res.json({"result":"not success"})
        }
        else {
          console.log('cancel success')
          console.log(data)
          res.status(200)
          res.json({"result": data.state})
          clearTimeout(timer)
        }
      })
  }
})

app.post('/api/order', (req, res) => {
  console.log(req.body)
  if (isEmptyObject(req.body)) {
    res.status(400);
    res.send('bad request')
  }
  if (req.body) {
    order = req.body
    let data0 = new mongoose({ name: order.name, amount: order.amount, state: 'created'})
    console.log(data0)
    // save to db
    data0.save((err) => {
      if (err) {
        console.log('mongo save error1')
        res.status(401)
        res.json({"result":"not success"})
      }
      else {
        console.log('mongo save success')
        res.status(200)
        res.json({"result":"created"})
        //res.send({"result":"success"})
        //send order to payment app
        publisher(order)
      }
    })
  }
});

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`)
})

module.exports = app
