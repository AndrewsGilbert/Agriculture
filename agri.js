const prompt1 = require('prompt-sync')();
const prompt2 = require('prompt-sync')();
const prompt3 = require('prompt-sync')();
const prompt4 = require('prompt-sync')();
const prompt5 = require('prompt-sync')();
const prompt6 = require('prompt-sync')();
const prompt7 = require('prompt-sync')();
const prompt8 = require('prompt-sync')();
const prompt9 = require('prompt-sync')();

 
var Survey_number = prompt1('Survey Number ');
var Length = prompt2('Length ');
var Width = prompt3('Width ');
var Location = prompt4('Location ');
var Owner_name = prompt5('Owner_name ');
var Contact_No = prompt6('Contact_No ');
var Soil = prompt7('Soil ');
var Soil_ph = prompt8('Soil_ph ');
var Plant = prompt9('Plant ');


var lands_details = {};

var lands_count = (Object.keys(lands_details).length);

class plot{
    constructor(Survey_number, Length, Width, Location,Owner_name,Contact_No,Soil,Soil_ph,Plant) {
        this.plot_id = Survey_number;
        this.len = Length;
        this.wid = Width;
        this.location = Location;
        this.owner_name = Owner_name;
        this.contact_no = Contact_No;
        this.soil = Soil;
        this.soil_ph = Soil_ph;
        this.plant = Plant;
        
    }
};



function create_land() {

     lands_details [lands_count+1] = new plot(Survey_number, Length, Width, Location,Owner_name,Contact_No,Soil,Soil_ph,Plant);
    

    return lands_details;
};



console.log(create_land()); // to register land details