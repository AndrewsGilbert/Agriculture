const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/agriWork.HTML')
})

app.post('/addLand', function (req, res) {
  fs.readFile('store.txt', 'utf8', function (err) {
    if (err) {
      fs.writeFileSync('store.txt', '{}', 'utf8')
    }
    const data = fs.readFileSync('store.txt', 'utf8')
    const landsDetails = JSON.parse(data)
    const landsKeys = Object.keys(landsDetails)
    const id = req.body.plotId

    if (!landsKeys.includes(id)) {
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

      fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
      res.write(JSON.stringify(landsDetails[id], null, 2))
      res.end('land is added')
    } else {
      return res.end('The land id is already exist')
    }
  })
})

app.post('/display', function (req, res) {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      return res.end('No lands are added')
    } else {
      const landsDetails = JSON.parse(data)
      const landsCount = (Object.keys(landsDetails).length)

      res.write('Number of lands are ' + landsCount)
      res.write('\r\n' + 'The lands details are ' + '\r\n')
      res.end(JSON.stringify(landsDetails, null, 2))
    }
  })
})

app.post('/findPlant', function (req, res) {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      return res.end('No lands are added')
    } else {
      const array = []
      const reqPlant = req.body.reqPlant
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
        return res.end('\r\n' + 'Entered plant is not available')
      }
    }
  })
})

app.post('/deleteLand', function (req, res) {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      return res.end('No lands are added')
    } else {
      const id = req.body.landId
      const landsDetails = JSON.parse(data)
      const landsKeys = Object.keys(landsDetails)
      if (landsKeys.includes(id)) {
        delete landsDetails[id]
        fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
        res.write('\r\n' + 'Land is deleted,Land id is ')
        res.write(id)
        res.end()
      } else {
        return res.end('Enter id does not exist')
      }
    }
  })
})

app.post('/changeProperty', function (req, res) {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      return res.end('No lands are added')
    } else {
      const landsDetails = JSON.parse(data)
      const landsKeys = (Object.keys(landsDetails))
      const landsChar = (Object.keys(landsDetails[landsKeys[0]]))

      const id = req.body.lanDId
      if (!landsKeys.includes(id)) {
        return res.end('Entered id is not available')
      } else {
        const property = req.body.property
        if (landsChar.includes(property)) {
          const detail = req.body.data
          if (detail !== '') {
            const mainKey = landsDetails[id]
            mainKey[property] = detail
          }
          fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
          res.write('\r\n' + 'Land details modified' + '\r\n')
          res.end(JSON.stringify(landsDetails[id]), null, 2)
        } else {
          res.end('Entered property is not exist')
        }
      }
    }
  })
})

app.listen(8080, function () {
  console.log('Node server is running..')
})
