const fs = require('fs')
const prompt = require('prompt-sync')()
function createLand () {
  class Plot {
    constructor (id, Length, Width, Location, ownerName, contactNo, Soil, soilPh, Plant) {
      this.plot_id = id
      this.len = Length
      this.wid = Width
      this.location = Location
      this.owner_name = ownerName
      this.contact_no = contactNo
      this.soil = Soil
      this.soil_ph = soilPh
      this.plant = Plant
    }
  }

  fs.readFile('store.txt', 'utf8', function (err) {
    if (err) {
      fs.writeFileSync('store.txt', '{}', 'utf8')
    }
    const data = fs.readFileSync('store.txt', 'utf8')
    const landsDetails = JSON.parse(data)
    const landsKeys = Object.keys(landsDetails)
    const id = prompt('surveyNumber ')

    if (!landsKeys.includes(id)) {
      const Length = prompt('Length ')
      const Width = prompt('Width ')
      const Location = prompt('Location ')
      const ownerName = prompt('ownerName ')
      const contactNo = prompt('contactNo ')
      const Soil = prompt('Soil ')
      const soilPh = prompt('soilPh ')
      const Plant = prompt('Plant ')

      landsDetails[id] = new Plot(id, Length, Width, Location, ownerName, contactNo, Soil, soilPh, Plant)
      fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')

      console.log('Land details added')
      console.log('\r\n', landsDetails[id])
    } else { console.log('Already land is existed') }
  })
};

function display () {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) { console.log('No lands are added') }
    if (data) {
      const landsDetails = JSON.parse(data)
      const landsCount = (Object.keys(landsDetails).length)

      console.log('\r\n' + 'Number of lands are ', landsCount)
      console.log('\r\n' + 'The lands details are ', landsDetails)
    }
  })
}

function changeData () {
  const data = fs.readFileSync('store.txt', 'utf8')
  const landsDetails = JSON.parse(data)
  const landsKeys = (Object.keys(landsDetails))
  const landsChar = (Object.keys(landsDetails[1]))

  const id = prompt(' Id number ')

  if (landsKeys.includes(id)) {
    for (let i = 0; i < landsChar.length; i++) {
      const changeProp = landsChar[i]
      const bool = prompt(' is change for ? ' + changeProp + ' give y/n ')
      if (bool === 'n') { continue }
      const detail = prompt(' Enter the data for ' + changeProp + ' ')
      if (detail !== '') {
        const mainKey = landsDetails[id]
        mainKey[changeProp] = detail
      }
    }
    fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
    console.log('\r\n' + 'Land details modified')
    console.log('\r\n', landsDetails[id])
  } else { console.log('id does not exist') }
}

function findPlant () {
  const array = []
  const reqPlant = prompt('Enter the plant name ')

  const data = fs.readFileSync('store.txt', 'utf8')
  const landsDetails = JSON.parse(data)

  for (const id in landsDetails) {
    if (landsDetails[id].plant === reqPlant) { array.push(id) }
  }

  console.log('\r\n' + ' no of plots with ' + reqPlant + ' = ' + array.length) // no of lands with this plant

  console.log('\r\n' + ' plot numbers which is with ' + reqPlant + ' = ' + array) // land id of with this plant is stored

  console.log(getLandDet()) // to get the details of lands,which is having particular plant

  function getLandDet () {
    console.log('\r\n' + ' The details of land which is having ' + reqPlant + 'are ')

    for (let i = 0; i < array.length; i++) {
      const ref = i + 1
      const plantLandDet = landsDetails[array[i]]

      console.log('\r\n' + ' S.N. ' + ref + ' > ', plantLandDet)
    }
  }
}

// createLand() // to add a land

// display() // to view all the land details

changeData() // to modify the existing land details

// findPlant() // to find no of lands having particular plant
