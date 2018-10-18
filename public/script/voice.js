(function() {
    'use strict';
(function(window) {
var synth = window.speechSynthesis;

var dungeons = {0:'eastern',
		1:'desert',
		2:'hera',
		3:'pod',
		4:'swamp',
		5:'skull',
		6:'thieves',
		7:'ice',
		8:'mire',
		9:'turtle',
		'eastern':0,
		'desert':1,
		'hera':2,
		'pod':3,
		'swamp':4,
		'skull':5,
		'thieves':6,
		'ice':7,
		'mire':8,
		'turtle':9};
var dungeonPrizes = {	'green pendant':'prize-1',
			'pendant':'prize-2',
			'crystal':'prize-3',
			'red crystal':'prize-4'};
var currentdungeon=99;
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'got (the) :item': function(item) {
	item = item.toLowerCase();
	if(item=="bo"){item="bow";}
	if(item=="gloves"){item="glove";}
	if(item=="lamp"){item="lantern";}
	if(item=="cake"){item="cape";}
	if(item=="burner"||item=="banner"){item="byrna";}
	if(item=="cane"){item="somaria";}
	if(item=="bombus"){item="bombos";}
	if(item=="fire"){item="firerod";}
	if(item=="ice"){item="icerod";}
	if(item=="pearl"){item="moonpearl";}
	if(item=="mail"){item="tunic";}
	if(item=="agonhymn"){item="agahnim";}
	sayit("got "+item);
      $('div[style*="'+item+'"').click();
	if(currentdungeon<99&&($('div[style*="'+item+'"]').length>0||item=="trash")){
		$('div[style*="boss'+currentdungeon+'"]>span[style*="chest"]').click();
	}
    },
	'start :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		currentdungeon=dungeons[dungeon.toLowerCase()];
		sayit('start '+dungeons[currentdungeon]);
	},
	'killed boss': function(){
		$('div[style*="boss'+currentdungeon+'"]').click();
		sayit('finished '+dungeons[currentdungeon]);
		currentdungeon=99;
	},
	'finished': function(){
		sayit('Done with '+dungeons[currentdungeon]);
		currentdungeon=99;

	},
	'green pendant :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click();
		sayit('green pendant '+dungeon);
	},
	'pendant :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click().click();
		sayit('pendant '+dungeon);
	},
	'red crystal :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click().click().click().click();
		sayit('red crystal '+dungeon);
	},
	'crystal :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click().click().click();
		sayit('crystal '+dungeon);
	},
    'bombos :dungeon': function(dungeon){
        dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="medallion"]').click();
		sayit('bombos '+dungeon);
    },
      'ether :dungeon': function(dungeon){
        dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="medallion"]').click().click();
		sayit('bombos '+dungeon);
    },
      'quake :dungeon': function(dungeon){
        dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons[dungeon.toLowerCase()]+'"]>span[style*="medallion"]').click().click().click();
		sayit('bombos '+dungeon);
    }
  };
	var dungeonName = function(dungeon){
		console.log(dungeon);
		dungeon = dungeon.toLowerCase();
		if(dungeon=="herrera"){dungeon='hera';}
		if(dungeon=="hira"){dungeon='hera';}
		if(dungeon=="here"){dungeon='hera';}
		if(dungeon=="myer"){dungeon="mire";}
		if(dungeon=="easton"){dungeon="eastern";}
		return dungeon;
	}
	var sayit = function(utter){
	console.log(utter);
	var utterThis = new SpeechSynthesisUtterance(utter);
	synth.speak(utterThis);
	}
  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
}(window));
    // Your code here...
})();