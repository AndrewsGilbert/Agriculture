

var plots = { a1:{Plot_id:"a1",len:500,wid:300,location:"Tenkasi"},b1:{Plot_id:"b1",len:700,wid:500,location:"Ambai"},
	
			  a2:{Plot_id:"a2",len:1000,wid:600,location:"Kadayam"}
			};
			
		
var owners = { o1:{name:"Raja",gender:"Male",dob:"10.05.1972",contact_no:"229114"},
			  o2:{name:"Mani",gender:"Male",dob:"12.10.1985",contact_no:"202512"}
			};
		
		
var soils = { s1:{name:"Red soil",colour:"Red",type:"Silt",water_holding:"Low",nutrients:"Low",ph:6},
	
			  s2:{name:"Black soil",colour:"Black",type:"Clay",water_holding:"High",nutrients:"High",ph:7.5},
				 
			  s2:{name:"Alluvial soil",colour:"Grey",type:"Silt",water_holding:"Medium",nutrients:"High",ph:7}
			};
			

var plants = { p0:"no_plant", p1:"Tomotto", p2:"Rice",p3:"chilly" };
			
			
var lands = { la1:{owner:owners.o1,plot:plots.a1,plant:plants.p0,soil:soils.s2},la2:{owner:owners.o2,plot:plots.a2,plant:plants.p2,soil:soils.s1},
				
			  la3:{owner:owners.o1,plot:plots.b1,plant:plants.p2,soil:soils.s3},	

			};			
			
var temp_plant = [];

console.log("Plants = ",Object.values(plants));

const prompt = require('prompt-sync')();
 
var req_plant = prompt('Which plant need to check? ');

//var req_plant = expr;

find_plants(); //to find no of lands having particular plant

function find_plants() { 

			for ( id in lands) { 
	
			if ( lands[id].plant == req_plant ) { temp_plant.push(id) }
	
			} 	
			console.log("\r\n" + " no of plots with " + req_plant + " = " + temp_plant.length); //no of lands with this plant
			console.log("\r\n" + " plot numbers which is with " + req_plant + " = " + temp_plant); //land id of with this plant is stored
};
			


plant_of_detail(); // to get the details of lands,which is having particular plant

function plant_of_detail() {

	console.log("\r\n" + " The details of land which is having " + req_plant + " are ");

	for (i = 0; i < temp_plant.length; i++) { 

		a = i + 1;
		owner_det = lands[temp_plant[i]].owner;
		land_det = lands[temp_plant[i]].plot;

		console.log("\r\n" + "S.N." + a + " >")
		console.log("Owner Details = ", owner_det);
		console.log("Land Details = ", land_det);
	
	}

	
};


