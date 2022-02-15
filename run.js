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
        else if(circleColor == 2){
            circleColor = "#D82E3F"
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
        .attr('paint-order',"stroke")
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


function editCircleSize(RFID, OH){
    
    circleColor = "#00FF7F"
    strokeColor = "#191414"


    //colors stroke based on over/under
    if(RFID > OH){
      strokeColor = "#0A51F6"
    }
    else if(OH > RFID){
      strokeColor = "#D82E3F"
    }

    //colors circles based on over/under

    if (RFID > 0 & OH == 0){
      circleColor = "#0A51F6"
    }

    else if (RFID == 0 & OH > 0){
      circleColor = "#D82E3F"
    }

    else if (RFID == 0 & OH == 0){
      circleColor = "#B1B1B1"
    }

    
    let stroke = calculateStroke(OH, RFID) * 40
    let radius = calculateRadius(OH, RFID) * 40
    console.log(RFID)
    if(OH == RFID){
      stroke = 0
  }

    var u = d3.select('svg')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', radius)
    .style('fill', circleColor)
    .attr('stroke-width', stroke)
    .attr('paint-order',"stroke")
    .attr('stroke', strokeColor)

        
	console.log(nodes)
    return nodes
}



function calculateRadius(OH, RFID){

    console.log(OH)
    console.log(RFID)


    if(OH > 0 && RFID == 0){
      
      radius =  Math.sqrt(OH / Math.PI); 
      console.log("Radius=" + radius)
 // frozen out of stock 
    }
    else if(OH == 0 &&  RFID == 0){ // accurate out of stock 
      radius = 1.7841241161527712; 
    }
    else if(OH == 0 && RFID > 0){
      radius =  Math.sqrt(RFID / Math.PI);  // frozen out of stock 
    }
    else if(OH > RFID){
      radius =  Math.sqrt(RFID / Math.PI); // Overstated 
    } 
    else if(OH < RFID){
      radius =  Math.sqrt(OH / Math.PI); //Understated 
    }
    else {
      radius = Math.sqrt(RFID / Math.PI); // Exact Match 
    }
    
    return radius;
}

function calculateStroke(OH, RFID){
  

    if (OH == RFID) { //Equal
      stroke = 0;
    }

    else if((OH > 0 && RFID == 0 ) || (OH == 0 && RFID > 0)){ // frozen out of stock 
      stroke =  0;  
    }

    
    else if(OH != RFID){ // Overstated 
      stroke = Math.abs((Math.sqrt(OH / Math.PI)) - (Math.sqrt(RFID / Math.PI)))
    } 
    return stroke * 2
  }
  



  function calculateRadiusWithStroke(OH, RFID){
    return Math.max(calculateRadius(OH, RFID) + calculateStroke(OH,RFID) / 2, 0);
  }
  
  function calculateRadiusWithoutStroke(OH, RFID){
    return  Math.max(calculateRadius(OH, RFID) - calculateStroke(OH,RFID) / 2, 0);
  }

 