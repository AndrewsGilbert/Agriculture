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

const landsDetails = {}

const landsCount = (Object.keys(landsDetails).length)
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
};

createLand()

function createLand () {
  landsDetails[landsCount + 1] = new Plot(surveyNumber, Length, Width, Location, ownerName, contactNo, Soil, soilPh, Plant)

  return landsDetails
};

const fs = require('fs')

fs.appendFileSync('AgricultureData.txt', JSON.stringify(landsDetails, null, 2), 'utf8')

const read = fs.readFileSync('AgricultureData.txt', 'utf8')

console.log(read)
