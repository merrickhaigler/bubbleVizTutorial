//this controls the circle simulation
function simulate(nodes, strength, y){ 
    
	var simulation = d3.forceSimulation(nodes)
        .alphaDecay(.1)
        .force('charge', d3.forceManyBody().strength(strength))
        .force('y', d3.forceY().strength(y))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(function(d) {
			return d.radius + 5;
		}))
        .on('tick', ticked);
        

	function ticked() {
		var u = d3.select('svg')
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('r', function(d) {
				return d.radius;
			})
			.style('fill', function(d) {
				return colorScale[d.category];
			})
			.attr('cx', function(d) {
				return d.x;
			})
			.attr('cy', function(d) {
				return d.y;
			});
	}
    return simulation;
}



//changes color of circle
function editCircle(numNodes, radius, circleColor, strokeColor, strokeWidth){
    
    if(numNodes == 1){
        
        if(circleColor == 3){
            circleColor = "#B1B1B1"
        }
        else{
            circleColor = "#00FF7F"
        }


        svg.selectAll("circle")
            .remove()
        
        svg
        .append("circle")
        .attr('r', radius) 
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .style('fill', circleColor);
    
        return nodes
    }

    else if(numNodes > 1){
        var nodes = d3.range(numNodes).map(function(d, i) {
            return {
                radius: radius,
                category: i % 3 + 1
            }
        });

        svg.selectAll("circle")
            .attr("stroke", strokeColor)
            .attr("stroke-width", strokeWidth) 
            

        console.log(nodes)
        return nodes
    }
}


 




function editCircleSize(radius){
    
    var u = d3.select('svg')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', radius)

        
	console.log(nodes)
    return nodes
}