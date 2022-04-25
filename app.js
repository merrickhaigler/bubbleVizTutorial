var width = window.innerWidth  ;
var height = window.innerHeight / 2 + 100;


var colorScale = ['#00FF7F', '#0A51F6', '#D82E3F', '#B1B1B1'];
var strokeScale =  ['#00FF7F','#0A51F6', '#D82E3F'];
var numNodes = 1;      
//var button = 1;



var svg = d3.select("#viz1")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#00000")


var rectangle = d3.select("#rect").append("svg").attr("width", 800).attr("height", 200)

svg.append('rect')
  .attr('x', 214)
  .attr('y', 80)
  .attr('rx', 8)
  .attr('ry', 8)
  .attr('width', 539)
  .attr("align","center")
  .attr('height', 425)
  .attr('stroke', 'black')
  .attr('fill', '#6f6f6f');


  var text = d3.select("#text").append("svg").attr("width", 800).attr("height", 200)

svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Match'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)

//first circle being created
var nodes = d3.range(numNodes).map(function(d, i) {
	return {
		radius: 100,
		category: 0,
		stroke: 1
	}
	
});

//first simulation run
simulate(nodes, -1 , .9);



////show equal example
document.getElementById('Match').onclick = function() {
	
	editCircle(1, 100, 0, "#00000", 0)	

	svg.select('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Exact'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)
}

//show overstated example
document.getElementById('Over').onclick = function() {
	editCircle(1, 75, 0, "#D82E3F", 50)

	svg.select('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Over'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)
}
//show understated example
document.getElementById('Under').onclick = function() {
	editCircle(1, 75, 0, "#0A51F6", 50)

	svg.selectAll('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Under'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)
	
}

//show both frozen examples
document.getElementById('Frozen').onclick = function() {
	editCircle(1, 100, 2, "#D82E3F", 0)
	
	svg.selectAll('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Frozen'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)
}


//show out of stock but equal example
document.getElementById('Out').onclick = function() {
	editCircle(1, 100, 3, "#00000", 0)

	svg.selectAll('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Out'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)
}


//Letting user change circle sizes
document.getElementById('Input').onclick = function() {

	editCircle(1, 159.57691216057307, 0, "#00000", 0)

	svg.selectAll('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Input'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 520)

	//RFID SLIDER
	var RFIDslider = document.getElementById("RFIDslider");
	var RFIDoutput = RFIDslider;


	RFIDoutput.innerHTML = RFIDslider.value; // Display the default slider value
	// Update the current slider value (each time you drag the slider handle)
	RFIDslider.oninput = function() {
  		RFIDoutput = RFIDslider.value * 10;
		editCircleSize(RFIDoutput, OHoutput)
		OHoutput = OHslider.value * 10;
		editCircleSize(RFIDoutput, OHoutput)
		
	}


	//RFID SLIDER
	var OHslider = document.getElementById("OHslider");
	var OHoutput = OHslider;


	OHoutput.innerHTML = OHslider.value; // Display the default slider value
	// Update the current slider value (each time you drag the slider handle)
	OHslider.oninput = function() {
  		OHoutput = OHslider.value * 10;
		editCircleSize(RFIDoutput, OHoutput)
		RFIDoutput = RFIDslider.value * 10;
		editCircleSize(RFIDoutput, OHoutput)
	}

}

//run simulation with all of nodes
document.getElementById('Store').onclick = function() {

	svg.selectAll('text').remove()

	svg.append('text')
	.attr('x', 230)
	.attr('y', 120)
	.style("text-anchor", "center")
	.attr('stroke', 'white')
	.attr('fill', 'white')
	.text(editText('Store'))
	.attr('dy', 25)
	.style("font-size", "34px")
	.style("font-family", "arial")
	.call(wrap, 530) 
	
	numNodes = 100
	var nodes = d3.range(numNodes).map(function(d, i) {
		return {
			radius: 5 + Math.random() * 15,
			category: 0,
			stroke: i % 3,
			strokeSize: Math.random() * 14
		}
	});
	console.log(nodes)
	simulate(nodes, -1, .001)
	
	var u = d3.select('svg')
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('paint-order',"stroke")
			.attr("stroke-width", function(d) {
				return [d.strokeSize];
			}) 
			.attr("stroke",function(d) {
				return strokeScale[d.stroke];
			})
			

}

