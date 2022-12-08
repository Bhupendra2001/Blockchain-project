const express = require('express')
const cripto = require('./models')
const axios = require('axios')
const router = express.Router()



router.get("/getData", async function (req, res) {

    try {

        let header = req.headers["authorization"]
       
        if (!header) { return res.status(401).send({ status : false , msg: "headers must be present" }) }

        let options = await axios.get(`https://api.coincap.io/v2/assets`, {
            headers: {
                Authorization:header,
            }
        })

        let result = options.data.data
        let final = result.sort((a, b) => b.changePercent24Hr.localeCompare(a.changePercent24Hr))

        await cripto.deleteMany()

        let finalData = await cripto.create(final)
     
        res.status(200).send({status:true , msg: finalData})

      } catch (err) {

        return res.status(500).send({ status: false, msg: err.message })
    }
})


module.exports = router