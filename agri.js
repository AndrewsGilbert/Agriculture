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

      const nextData = prompt('want to add another land, provide y/n ')
      if (nextData === 'y') { createLand() } else { menu() }
    } else {
      console.log('\r\n' + 'Already land is existed')
      const nextData = prompt('want to add another land, provide y/n ')
      if (nextData === 'y') { createLand() } else { menu() }
    }
  })
};

function display () {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      console.log('\r\n' + 'No lands are added' + '\r\n')
      const Menu = prompt('Enter to menu ')
      if (Menu === '') { menu() }
    } else {
      const landsDetails = JSON.parse(data)
      const landsCount = (Object.keys(landsDetails).length)

      console.log('\r\n' + 'Number of lands are ', landsCount)
      console.log('\r\n' + 'The lands details are ', landsDetails)

      const Menu = prompt('Enter to menu ')
      if (Menu === '') { menu() }
    }
  })
}

function changeProperty () {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      console.log('\r\n' + 'No lands are added' + '\r\n')
      const Menu = prompt('Enter to menu ')
      if (Menu === '') { menu() }
    } else {
      const landsDetails = JSON.parse(data)
      const landsKeys = (Object.keys(landsDetails))
      const landsChar = (Object.keys(landsDetails[landsKeys[0]]))

      const id = prompt(' Id number ')
      if (!landsKeys.includes(id)) {
        console.log('\r\n' + 'Entered id is not available')
        const nextData = prompt('want to change another land data, provide y/n ')
        if (nextData === 'y') { changeProperty() } else { menu() }
      } else { changeData() }

      function changeData () {
        console.log(landsChar)
        const property = prompt(' Which property to be change ')

        if (landsChar.includes(property)) {
          const detail = prompt(' Enter the data ')
          if (detail !== '') {
            const mainKey = landsDetails[id]
            mainKey[property] = detail
          }
          const nextProperty = prompt('want to change another property,provide y/n ')
          if (nextProperty === 'y') { changeData() } else {
            fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
            console.log('\r\n' + 'Land details modified')
            console.log('\r\n', landsDetails[id])
            const nextData = prompt('want to change another land data, provide y/n ')
            if (nextData === 'y') { changeProperty() } else { menu() }
          }
        } else {
          console.log('Entered property is invalid, Enter correct property')
          changeData()
        }
      }
    }
  })
}
function findPlant () {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      console.log('\r\n' + 'No lands are added' + '\r\n')
      const Menu = prompt('Enter to menu ')
      if (Menu === '') { menu() }
    } else {
      const array = []
      const reqPlant = prompt('Enter the plant name ')
      const landsDetails = JSON.parse(data)

      for (const id in landsDetails) {
        if (landsDetails[id].plant === reqPlant) { array.push(id) }
      }
      if (array.length > 0) {
        console.log('\r\n' + ' no of plots with ' + reqPlant + ' = ' + array.length) // no of lands with this plant

        console.log('\r\n' + ' plot numbers which is with ' + reqPlant + ' = ' + array) // land id of with this plant is stored
        getLandDet()
        function getLandDet () {
          console.log('\r\n' + ' The details of land which is having ' + reqPlant + 'are ')

          for (let i = 0; i < array.length; i++) {
            const ref = i + 1
            const plantLandDet = landsDetails[array[i]]

            console.log('\r\n' + ' S.N. ' + ref + ' > ', plantLandDet)
          }
          const nextData = prompt('want to check another plant,provide y/n ')
          if (nextData === 'y') { findPlant() } else { menu() }
        }
      } else {
        console.log('\r\n' + 'Entered plant is not available')
        const nextData = prompt('want to check another plant,provide y/n ')
        if (nextData === 'y') { findPlant() } else { menu() }
      }
    }
  })
}

function deleteLand () {
  fs.readFile('store.txt', 'utf8', function (err, data) {
    if (err) {
      console.log('\r\n' + 'No lands are added' + '\r\n')
      const Menu = prompt('Enter to menu ')
      if (Menu === '') { menu() }
    } else {
      const id = prompt('Enter the id ')
      const landsDetails = JSON.parse(data)
      const landsKeys = Object.keys(landsDetails)
      if (landsKeys.includes(id)) {
        delete landsDetails[id]
        fs.writeFileSync('store.txt', JSON.stringify(landsDetails, null, 2), 'utf8')
        console.log('\r\n' + 'Land is deleted,Land id is ', id)
        const nextData = prompt('want to delete another land, provide y/n ')
        if (nextData === 'y') { deleteLand() } else { menu() }
      } else {
        console.log('\r\n' + 'Enter id does not exist')
        const nextData = prompt('want to delete another land, provide y/n ')
        if (nextData === 'y') { deleteLand() } else { menu() }
      }
    }
  })
}

menu()
function menu () {
  console.log('\r\n' + 'Please find the menu')
  console.log('\r\n' + '1.Create the land, 2.Display the details, 3.Find the plant, 4.Change the detail,5.Delete the land ' + '\r\n')
  const need = prompt('Enter a number for operation ')

  if (need === '1') { createLand() } // to add a land
  if (need === '2') { display() } // to view all the land details
  if (need === '3') { findPlant() } // to modify the existing land details
  if (need === '4') { changeProperty() } // to find no of lands having particular plant
  if (need === '5') { deleteLand() } // to delete the land
}
