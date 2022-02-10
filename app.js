var width = window.innerWidth;
var height = window.innerHeight - 100;


var colorScale = ['#00FF7F', '#0A51F6', '#D82E3F', '#B1B1B1'];
var strokeScale =  ['#00FF7F','#0A51F6', '#D82E3F'];
var xCenter = [width / 2, width / 2, width / 2, width / 2];
var yCenter = [height / 2, height / 2, height / 2, height / 2];
var numNodes = 1;      
//var button = 1;



    

var svg = d3.select("#viz1")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#191414")

//first circle being created
var nodes = d3.range(numNodes).map(function(d, i) {
	return {
		radius: 100,
		category: 0,
		stroke: 1
	}
	
});

//first simulation run
simulate(nodes, -10000 , .4);



////show equal example
document.getElementById('Exact').onclick = function() {
	editCircle(1, 100, 0, "#00000", 0)	
}

//show overstated example
document.getElementById('Over').onclick = function() {
	editCircle(1, 100, 0, "#D82E3F", 20)
}
//show understated example
document.getElementById('Under').onclick = function() {
	editCircle(1, 100, 0, "#0A51F6", 20)
	
}

//show both frozen examples
document.getElementById('Frozen').onclick = function() {
	simulate(editCircle(2, 100, 0, "#0A51F6", 0), -1000 , .4)
}


//show out of stock but equal example
document.getElementById('Out').onclick = function() {
	editCircle(1, 10, 3, "#00000", 0)
}


//Letting user change circle sizes
document.getElementById('Input').onclick = function() {
	
	editCircle(1, 50, 0, "#00000", 0)

	//RFID SLIDER
	var RFIDslider = document.getElementById("RFIDslider");
	var RFIDoutput = RFIDslider;


	RFIDoutput.innerHTML = RFIDslider.value; // Display the default slider value
	// Update the current slider value (each time you drag the slider handle)
	RFIDslider.oninput = function() {
  		RFIDoutput = RFIDslider.value * 10;
		  console.log(RFIDoutput)
		  editCircleSize(RFIDoutput)

	}


	//RFID SLIDER
	var OHslider = document.getElementById("OHslider");
	var OHoutput = OHslider;


	OHoutput.innerHTML = OHslider.value; // Display the default slider value
	// Update the current slider value (each time you drag the slider handle)
	OHslider.oninput = function() {
  		OHoutput = OHslider.value * 10;
		  console.log(OHoutput)
		  editCircleSize(OHoutput)

	}

}

//run simulation with all of nodes
document.getElementById('store').onclick = function() {
	numNodes = 100
	var nodes = d3.range(numNodes).map(function(d, i) {
		return {
			radius: 10 + Math.random() * 20,
			category: 0,
			stroke: i % 3,
			strokeSize: Math.random() * 10
		}
	});
	console.log(nodes)
	simulate(nodes, -1 , 0)
	
	var u = d3.select('svg')
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr("stroke-width", function(d) {
				return [d.strokeSize];
			}) 
			.attr("stroke",function(d) {
				return strokeScale[d.stroke];
			})

}


