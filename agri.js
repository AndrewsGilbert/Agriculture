const express = require('express')
const fs = require('fs')
const router = express.Router()
const alert = require('alert')
const app = express()
let surveyNumber = ''
let reqProperty = ''
const bodyParser = require('body-parser')
const path = require('path')

router.use(bodyParser.urlencoded({
  extended: true
}))

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/home.HTML'))
})

router.get('/addLand', function (req, res) {
  res.sendFile(path.join(__dirname, '/addLand.HTML'))
})

router.get('/addLand/landDetail', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err) {
    if (err) {
      fs.writeFileSync('store2.txt', '{}', 'utf8')
    }
    const data = fs.readFileSync('store2.txt', 'utf8')
    const landsDetails = JSON.parse(data)
    const landsKeys = Object.keys(landsDetails)
    const id = req.query.plotId
    if (!landsKeys.includes(id) && id !== '') {
      surveyNumber = id
      res.sendFile(path.join(__dirname, '/landDetail.HTML'))
    } else if (id === '') {
      alert('Please enter valid survey number')
      res.sendFile(path.join(__dirname, '/addLand.HTML'))
    } else {
      alert('The land id is already exist')
      res.sendFile(path.join(__dirname, '/addLand.HTML'))
    }
  })
})

router.post('/addLand/landDetail/landAdded', function (req, res) {
  const data = fs.readFileSync('store2.txt', 'utf8')
  const landsDetails = JSON.parse(data)
  const id = surveyNumber
  const length = req.body.length
  const width = req.body.width
  const Location = req.body.Location
  const ownerName = req.body.ownerName
  const contactNo = req.body.contactNo
  const soil = req.body.soil
  const soilPh = req.body.soilPh
  const corp = req.body.corp

  class Plot {
    constructor (id, length, width, Location, ownerName, contactNo, soil, soilPh, corp) {
      this.plot_id = id
      this.len = length
      this.wid = width
      this.location = Location
      this.owner_name = ownerName
      this.contact_no = contactNo
      this.soil = soil
      this.soil_ph = soilPh
      this.plant = corp
    }
  }
  landsDetails[id] = new Plot(id, length, width, Location, ownerName, contactNo, soil, soilPh, corp)

  fs.writeFileSync('store2.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
  alert('land is added')
  res.write(JSON.stringify(landsDetails[id], null, 2))
  res.end()
})

router.get('/displayLand', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err, data) {
    if (err) {
      alert('No lands are added')
      res.sendFile(path.join(__dirname, '/home.HTML'))
    } else {
      const landsDetails = JSON.parse(data)
      const landsCount = (Object.keys(landsDetails).length)

      res.write('Number of lands are ' + landsCount)
      res.write('\r\n' + 'The lands details are ' + '\r\n')
      res.end(JSON.stringify(landsDetails, null, 2))
    }
  })
})

router.get('/findPlant', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err) {
    if (err) {
      alert('No lands are added')
      res.sendFile(path.join(__dirname, '/home.HTML'))
    } else {
      res.sendFile(path.join(__dirname, '/findPlant.HTML'))
    }
  })
})
router.get('/findPlant/plant', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err, data) {
    if (!err) {
      const array = []
      const reqPlant = req.query.reqPlant
      const landsDetails = JSON.parse(data)

      for (const id in landsDetails) {
        if (landsDetails[id].plant === reqPlant) { array.push(id) }
      }
      if (array.length > 0) {
        res.write('\r\n' + ' no of plots with ' + reqPlant + ' = ' + array.length) // no of lands with this plant

        res.write('\r\n' + ' plot numbers which is with ' + reqPlant + ' = ' + array) // land id of with this plant is stored

        res.write('\r\n' + ' The details of land which is having ' + reqPlant + ' are ')

        for (let i = 0; i < array.length; i++) {
          const ref = i + 1
          const plantLandDet = landsDetails[array[i]]

          res.write('\r\n' + ' S.N. ' + ref + ' > ')
          res.write(JSON.stringify(plantLandDet, null, 2))
        } res.end()
      } else {
        alert('Entered plant is not available')
        res.sendFile(path.join(__dirname, '/findPlant.HTML'))
      }
    }
  })
})

router.get('/deleteLand', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err) {
    if (err) {
      alert('No lands are added')
      res.sendFile(path.join(__dirname, '/home.HTML'))
    } else {
      res.sendFile(path.join(__dirname, '/deleteLand.HTML'))
    }
  })
})

router.get('/deleteLand/land', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err, data) {
    if (!err) {
      const id = req.query.landId
      const landsDetails = JSON.parse(data)
      const landsKeys = Object.keys(landsDetails)
      if (landsKeys.includes(id)) {
        delete landsDetails[id]
        fs.writeFileSync('store2.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
        res.write('\r\n' + 'Land is deleted,Land id is ')
        res.write(id)
        res.end()
      } else {
        alert('Enter id does not exist')
        res.sendFile(path.join(__dirname, '/deleteLand.HTML'))
      }
    }
  })
})

router.get('/changeProperty', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err) {
    if (err) {
      alert('No lands are added')
      res.sendFile(path.join(__dirname, '/home.HTML'))
    } else {
      res.sendFile(path.join(__dirname, '/changeProperty.HTML'))
    }
  })
})

router.get('/changeProperty/id', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err, data) {
    if (!err) {
      const landsDetails = JSON.parse(data)
      const landsKeys = (Object.keys(landsDetails))

      const id = req.query.lanDId

      if (!landsKeys.includes(id)) {
        alert('Entered id is not available')
        res.sendFile(path.join(__dirname, '/changeProperty.HTML'))
      } else {
        surveyNumber = id
        res.sendFile(path.join(__dirname, '/getProperty.HTML'))
      }
    }
  })
})

router.get('/changeProperty/id/prop', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err, data) {
    if (!err) {
      const landsDetails = JSON.parse(data)
      const landsKeys = (Object.keys(landsDetails))
      const landsChar = (Object.keys(landsDetails[landsKeys[0]]))
      const property = req.query.property
      if (!landsChar.includes(property)) {
        alert('Entered property is not exist')
        res.sendFile(path.join(__dirname, '/getProperty.HTML'))
      } else {
        reqProperty = property
        res.sendFile(path.join(__dirname, '/changeData.HTML'))
      }
    }
  })
})
router.get('/changeProperty/id/prop/data', function (req, res) {
  fs.readFile('store2.txt', 'utf8', function (err, data) {
    if (!err) {
      const landsDetails = JSON.parse(data)
      const id = surveyNumber
      const property = reqProperty
      const detail = req.query.value
      if (detail !== '') {
        const mainKey = landsDetails[id]
        mainKey[property] = detail
      }
      fs.writeFileSync('store2.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
      res.write('\r\n' + 'Land details modified' + '\r\n')
      res.end(JSON.stringify(landsDetails[id]), null, 2)
    }
  })
})

app.use('/', router)
app.listen(8586, function () {
  console.log('Node server is running..')
})
