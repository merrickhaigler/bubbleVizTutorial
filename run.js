//this controls the circle simulation
function simulate(nodes, strength, y){ 
    
	var simulation = d3.forceSimulation(nodes)
        .alphaDecay(.1)
        .force('charge', d3.forceManyBody().strength(strength))
        .force('y', d3.forceY().strength(y))
        .force('center', d3.forceCenter(width / 1.65, height / 2.3))
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
        .attr("cx", width / 1.65)
        .attr("cy", height /  2.3)
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

 function editText(text){
   if(text == 'Exact'){
     text = "Exact Match happens when the RFID count and On-Hand count are equal. In simpler terms: When a store's inventory system is displaying the correct amount of actual units in store. This is shown by a completely greeen circle. There is perfect overlap between the two records. The circle size depends on how many units of the SKU are accounted for."
   }
     
   else if(text == 'Over'){
    text = "When the count of On-Hands exceeds the count that is captured by RFID for a particular SKU, this is called Overstated. In simpler terms: When a store's inventory system claims more units than they actually have. The green in the circle still represents the amount of units that overlap, but the red is the amount that the store has overstated."
   }

   else if(text == 'Under'){
    text = "When the count of RFID exceeds the On-Hand count for a particular SKU. In simpler terms: When a store has more units than their inventory system claims. The green in the circle still represents the amount of units that overlap, but the blue is the amount that the store has understated."
   }

   else if(text == 'Frozen'){
    text = "Frozen Out-Of-Stock is when a SKU has an On-Hand count greater than 0, but the RFID count shows 0. In simpler terms: When a store's inventory system displays units in-stock, but there are no units in the store. Such a case can prevent replenishment or additional sales. This is shown with a completely red circle and these SKU's are the ones that need the most attention."
   }

   else if(text == 'Out'){
    text = "Out-of-Stock SKU's are exaclty what they sound like, Out-of-Stock. The RFID count and the On Hand count are equal, but both are reporting that the are 0 units in stock. These SKU's are not wrong, but they are unable to be purchased. They are represented as grey circles."
   }

   else if(text == 'Input'){
    text = "Now you have the opportunity to manipulate the SKU. The top slider is the RFID count and the bottom slider is the On Hand count. Drag each slider back and forth for a better understading of how the SKU is effected under different cirumstances."
   }

   else if(text == 'Store'){
    text = "Here we see a mock store of 100 SKU's. "
   }
   

   return text;
 }

 function wrap(text, width) {
  text.each(function () {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          x = text.attr("x"),
          y = text.attr("y"),
          dy = 0, //parseFloat(text.attr("dy")),
          tspan = text.text(null)
                      .append("tspan")
                      .attr("x", x)
                      .attr("y", y)
                      .attr("dy", dy + "em");
      while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan")
                          .attr("x", x)
                          .attr("y", y)
                          .attr("dy", ++lineNumber * lineHeight + dy + "em")
                          .text(word);
          }
      }
  });
}