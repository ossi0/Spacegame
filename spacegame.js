var x = 900;
var y = 700;
var planetArray = [];
var rocket = [];
var fr = 20;

var gconst = 1;
var mass = 1000;
var planetmass = 250;
var planetvelocityx;
var planetvelocityy;

var angle = Math.PI/2;

var boostcount = 0;
var boostercolor = 'black';

var state = 0;
var boostrem = 10;

var totalvel;


function planet(x, y, w, h, color, velx, vely) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.velx = velx;
	this.vely = vely;
}

function buildrocket(x, y, w, h, color, velx, vely, boostvelx, boostvely) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.velx = velx;
	this.vely = vely;
	this.boostvelx = boostvelx;
	this.boostvely = boostvely;
}



function setup() {
  createCanvas(x, y);
  var x1= 450;
  var y1= 350;
  var h1= 50;
  var color1 = '#ffc793';
  var velx1 = 0;
  var vely1 = 0;
  
  var x2= 300;
  var y2= 200;
  var h2= 15;
  var color2 = 'brown';
  var velx2 = 1.6;
  var vely2 = -1.6;
  
  var y3 = 180;
  var x3 = 300;
  var h3 = 8;
  var color3 = 'white';
  var velx3 = 1.6;
  var vely3 = -1.6;
  var boostvelx = 0;
  var boostvely = 0;
  
  var x4 = 600;
  var y4 = 500;
  var h4 = 13;
  var color4 = 'yellow';
  var velx4 = -1.6;
  var vely4 = 1.6;
  
  document.getElementById("boost").textContent = "Kaasu:" + " " + boostrem + "/" + "10" + " " + "---" + " " + "Nopeus:" + " " + totalvel ;
  
  
  planetArray.push(new planet(x1, y1, h1, h1, color1, velx1, vely1));
  planetArray.push(new planet(x2, y2, h2, h2, color2, velx2, vely2));
  planetArray.push(new planet(x4, y4, h4, h4, color4, velx4, vely4));
  rocket.push(new buildrocket(x3, y3, h3, h3, color3, velx3, vely3, boostvelx, boostvely));
}

function draw() {
	frameRate(fr);
	var c = document.getElementById("defaultCanvas0");
	var ctx = c.getContext("2d");
	// ctx.globalAlpha = 0.2;
	ctx.clearRect(0, 0, x, y);
	// PLANEETAN LIIKERATA 
	
	for (var i = 1; i < planetArray.length; i++) {
		var rad = Math.sqrt(Math.pow((planetArray[0].x - planetArray[i].x), 2) + Math.pow((planetArray[0].y - planetArray[i].y),2 ));
		
		var acc = (gconst*mass)/Math.pow(rad, 2);
		if (acc > 0.10) {
			acc = 0.10;
		}
		var accx = ((planetArray[0].x-planetArray[i].x)/rad)*acc;
		var accy = ((planetArray[0].y-planetArray[i].y)/rad)*acc;
		
		planetArray[i].velx += accx;
		planetArray[i].vely += accy;
		
		planetArray[i].x += planetArray[i].velx;
		planetArray[i].y += planetArray[i].vely;
		
	}
	
	
	// RAKETIN LIIKERATA
	

		var radS = Math.sqrt(Math.pow((planetArray[0].x - rocket[0].x), 2) + Math.pow((planetArray[0].y - rocket[0].y),2 )); // ETÄISYYS AURINGOSTA
		
		var accS = (gconst*mass)/Math.pow(radS, 2); // KIIHTYVYYS AURINGON SUHTEEN
		if (accS > 0.10) {
			accS = 0.10;
		}
		var accxS = ((planetArray[0].x-rocket[0].x)/radS)*accS;
		var accyS = ((planetArray[0].y-rocket[0].y)/radS)*accS;
		
		planetvelocityx = 0;
		planetvelocityy = 0;
		
	for (var j=1; j < planetArray.length; j++) {	
		
		var rad = Math.sqrt(Math.pow((planetArray[j].x - rocket[0].x), 2) + Math.pow((planetArray[j].y - rocket[0].y),2 )); // ETÄISYYS PLANEETASTA
		
		if (rad > planetArray[j].h+1) {
			var accP = (gconst*planetmass)/Math.pow(rad, 2); // KIIHTYVYYS PLANEETAN SUHTEEN
			if (accP > 0.08) {
				accP = 0.08;
			}
		
		
		var accxP = ((planetArray[j].x-rocket[0].x)/rad)*accP;
		var accyP = ((planetArray[j].y-rocket[0].y)/rad)*accP;
		
		
		planetvelocityx += accxP;
		planetvelocityy += accyP;
		}
		
		rocket[0].velx += (accxS + planetvelocityx);
		rocket[0].vely += (accyS + planetvelocityy);
	
		if (radS < 50) {
			rocket[0].velx = 0 + rocket[0].boostvelx;
			rocket[0].vely = 0 + rocket[0].boostvely;
		}
		
		if (rad < planetArray[j].h) {
			rocket[0].velx = planetArray[j].velx + rocket[0].boostvelx;
			rocket[0].vely = planetArray[j].vely + rocket[0].boostvely;
		}
	}
	rocket[0].velx = rocket[0].velx + rocket[0].boostvelx;
	rocket[0].vely = rocket[0].vely + rocket[0].boostvely;
	rocket[0].boostvely = 0;
	rocket[0].boostvelx = 0;
	
	rocket[0].x += rocket[0].velx;
	rocket[0].y += rocket[0].vely;
	
	
	
	ctx.globalAlpha = 1;
	
	ellipseMode(RADIUS);
	fill(planetArray[0].color);
	ellipse(planetArray[0].x, planetArray[0].y, planetArray[0].h, planetArray[0].h);
	
	
	ellipseMode(RADIUS);
	fill(planetArray[1].color);
	ellipse(planetArray[1].x, planetArray[1].y, planetArray[1].h, planetArray[1].h);
	
	ellipseMode(RADIUS);
	fill(planetArray[2].color);
	ellipse(planetArray[2].x, planetArray[2].y, planetArray[2].h, planetArray[2].h);
	
	ellipseMode(RADIUS);
	fill(rocket[0].color);
	ellipse(rocket[0].x, rocket[0].y, rocket[0].h, rocket[0].h);
	
	ellipseMode(RADIUS);
	fill(boostercolor);
	ellipse((rocket[0].x - (Math.cos(angle)*rocket[0].h)), (rocket[0].y + (Math.sin(angle)*rocket[0].h)), rocket[0].h/2, rocket[0].h/2);
	
	boostercolor = 'black';
	
	var dvx = abs(rocket[0].velx - planetArray[1].velx);
	var dvy = abs(rocket[0].vely - planetArray[1].vely);
	
	totalvel = sqrt(pow(rocket[0].velx ,2) + pow(rocket[0].vely, 2)).toFixed(2);
	
	var radP = Math.sqrt(Math.pow((planetArray[2].x - rocket[0].x), 2) + Math.pow((planetArray[2].y - rocket[0].y),2 ));
	
	console.log(sqrt(pow(dvx ,2) + pow(dvy, 2)));
	
	check(radP,(sqrt(pow(dvx ,2) + pow(dvy, 2))));
	
	 document.getElementById("boost").textContent = "Kaasu:" + " " + boostrem + "/" + "10" + " " + "---" + " " + "Nopeus:" + " " + totalvel ;

}

		window.onkeydown = function(e) {
		   var key = e.keyCode ? e.keyCode : e.which;

		   if (key == 32 && state == 0 && boostrem > 0) {
			   rocket[0].boostvely += -(Math.sin(angle)*0.8);
			   rocket[0].boostvelx += (Math.cos(angle)*0.8);
			   boostcount++;
			   boostercolor = 'orange';
			   boostrem--;
			   
		   } else if (key == 32 && state == 1) {
				state = 0;
				location.reload();
		   } else if (key == 39) {
			   angle -= Math.PI/18; 
			   
		   } else if (key == 37) {
			   angle += Math.PI/18;
		   }
		}
		
		
	function check(rad, vel) {
		if (rad < planetArray[2].h+rocket[0].h) {
			if (vel < 1.7) {
				fr = 0;
				document.getElementById("defaultCanvas0").style.backgroundImage = 'url("images/win.png")';
				state = 1;
			} else if (vel >= 1.7) {
			fr = 0;
			document.getElementById("defaultCanvas0").style.backgroundImage = 'url("images/loss.png")';
			state = 1;
			}
		}
	}
	
