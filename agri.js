const fs = require('fs')

function createLand () {
  const prompt1 = require('prompt-sync')()
  const prompt2 = require('prompt-sync')()
  const prompt3 = require('prompt-sync')()
  const prompt4 = require('prompt-sync')()
  const prompt5 = require('prompt-sync')()
  const prompt6 = require('prompt-sync')()
  const prompt7 = require('prompt-sync')()
  const prompt8 = require('prompt-sync')()
  const prompt9 = require('prompt-sync')()

  const surveyNumber = prompt1('surveyNumber ')
  const Length = prompt2('Length ')
  const Width = prompt3('Width ')
  const Location = prompt4('Location ')
  const ownerName = prompt5('ownerName ')
  const contactNo = prompt6('contactNo ')
  const Soil = prompt7('Soil ')
  const soilPh = prompt8('soilPh ')
  const Plant = prompt9('Plant ')

  class Plot {
    constructor (surveyNumber, Length, Width, Location, ownerName, contactNo, Soil, soilPh, Plant) {
      this.plot_id = surveyNumber
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
    const landsCount = (Object.keys(landsDetails).length)
    landsDetails[landsCount + 1] = new Plot(surveyNumber, Length, Width, Location, ownerName, contactNo, Soil, soilPh, Plant)
    fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')

    console.log('Land details added')
    console.log('\r\n', landsDetails[landsCount + 1])
  })
};

function display () {
  const data = fs.readFileSync('store.txt', 'utf8')
  const landsDetails = JSON.parse(data)
  const landsCount = (Object.keys(landsDetails).length)

  console.log('\r\n' + 'Number of lands are ', landsCount)
  console.log('\r\n' + 'The lands details are ', landsDetails)
}

function changeData () {
  const prompt1 = require('prompt-sync')()
  const prompt2 = require('prompt-sync')()
  const prompt3 = require('prompt-sync')()

  const data = fs.readFileSync('store.txt', 'utf8')
  const landsDetails = JSON.parse(data)
  const landsKeys = (Object.keys(landsDetails[1]))

  const id = prompt1(' Id number ')
  console.log(landsKeys)
  const property = prompt2(' Which data to be change ')
  const detail = prompt3(' Enter the data ')
  const mainKey = landsDetails[id]
  mainKey[property] = detail

  fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')

  console.log('\r\n' + 'Land details modified')
  console.log('\r\n', mainKey)
}

// console.log(createLand())   // to add a land
// console.log(display())      // to view all the land details
// console.log(changeData())   // to modify the existing land details
