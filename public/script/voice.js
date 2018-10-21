var synth = window.speechSynthesis;
var toggleVoice = function(){
if(!$('#toggleVoice').is(':checked')){
	annyang.abort();
	$('#toggleVoice').text('Enable Voice Recognition');
} else {
	annyang.start();
	$('#toggleVoice').text('Disable Voice Recognition');
}
rootRef.child('voiceenabled').set($('#toggleVoice').is(':checked'));
saveCookie();
}
var saveGrammar = function(heard, map){
	var words = heard.split(" ");
	if(words[0]=="got"){
		grammars['items'][map].push(words[1]);
	}
	if(words[0]=="start"){
		grammars['dungeons'][map].push(words[1]);
	}
	rootRef.child('grammars').set(grammars);
	saveCookie();
}
var dungeons2 = {0:'eastern',
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
var grammarsinit = {
	'items':{
		'bow':[
			'bo',
			'boat'
		],
		'hookshot':[],
		'hammer':[],
		'flute':[],
		'book':[],
		'boots':[],
		'flippers':[],
		'mirror':[],
		'sword':[],
		'shield':[],
		'bombos':[],
		'ether':[],
		'quake':[],
		'shovel':[],
		'mushroom':[],
		'powder':[],
		'bottle':[],
		'silvers':[],
		'boomerang':[],
		'bomb':[],
		'net':[],
		'mpupgrade':[
			'magic'
		],
		'heartpiece':[
			'herpes'
		],
		'heartcontainer':[
			'heart'
		],
		'glove':[
			'gloves',
			'mitts'
		],
		'lantern':[
			'lamp',
			'lamb'
		],
		'cape':[
			'cake'
		],
		'byrna':[
			'burner',
			'banner'
		],
		'somaria':[
			'cane'
		],
		'bombos':[
			'bombus'
		],
		'firerod':[
			'fire'
		],
		'icerod':[
			'ice'
		],
		'moonpearl':[
			'pearl',
			'marble'
		],
		'tunic':[
			'mail',
			'shirt',
			'armor'
		],
		'agahnim':[
			'agonhymn'
		]
	},
	'dungeons':{
		'eastern':[
			'easton'
		],
		'desert':[],
		'hera':[
			'herrera',
			'hira',
			'here'
		],
		'pod':[],
		'swamp':[],
		'skull':[],
		'thieves':[],
		'ice':[],
		'mire':[
			'myer'
		],
		'turtle':[]
	}
}
var grammars;
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'got (the) :item': function(item) {
			$("#mapToGrammar").empty();
			$.each(grammars.items, function(key, value) {
					$('#mapToGrammar')
							.append($('<option>', { value : key })
							.text(key));
			});
		item = itemName(item);
		sayit("got "+item);
    $('div[style*="'+item+'"').click();
		if(currentdungeon<99&&($('div[style*="'+item+'"]').length>0||item=="trash")){
			$('div[style*="boss'+currentdungeon+'"]>span[style*="chest"]').click();
		}
  },
	'start :dungeon': function(dungeon){
		$("#mapToGrammar").empty();
		$.each(grammars.dungeons, function(key, value) {
			$('#mapToGrammar')
					 .append($('<option>', { value : key })
					 .text(key));
	 	});
		dungeon = dungeonName(dungeon);
		currentdungeon=dungeons2[dungeon.toLowerCase()];
		sayit('start '+dungeon);
	},
	'killed boss': function(){
		$('div[style*="boss'+currentdungeon+'"]').click();
		sayit('finished '+dungeons2[currentdungeon]);
		currentdungeon=99;
	},
	'finished': function(){
		sayit('Done with '+dungeons2[currentdungeon]);
		currentdungeon=99;
	},
	'green pendant :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click();
		sayit('green pendant '+dungeon);
	},
	'pendant :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click().click();
		sayit('pendant '+dungeon);
	},
	'red crystal :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click().click().click().click();
		sayit('red crystal '+dungeon);
	},
	'crystal :dungeon': function(dungeon){
		dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="dungeon"]').click().click().click();
		sayit('crystal '+dungeon);
	},
    'bombos :dungeon': function(dungeon){
        dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="medallion"]').click();
		sayit('bombos '+dungeon);
    },
      'ether :dungeon': function(dungeon){
        dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="medallion"]').click().click();
		sayit('bombos '+dungeon);
    },
      'quake :dungeon': function(dungeon){
        dungeon = dungeonName(dungeon);
		$('div[style*="boss'+dungeons2[dungeon.toLowerCase()]+'"]>span[style*="medallion"]').click().click().click();
		sayit('bombos '+dungeon);
    }
	};
	var itemName = function(item){
		item = item.toLowerCase();
		Object.keys(grammars['items']).forEach(function(gitem){
			grammars['items'][gitem].forEach(function(aitem){
				if(item==aitem){item=gitem;}
			});
		});
		return item;
	}
	var dungeonName = function(dungeon){
		dungeon = dungeon.toLowerCase();
		Object.keys(grammars['dungeons']).forEach(function(gdungeon){
			grammars['dungeons'][gdungeon].forEach(function(adungeon){
				if(dungeon==adungeon){dungeon=gdungeon;}
			});
		});
		console.log(dungeon);
		return dungeon;
	}
	var sayit = function(utter){
		console.log(utter);
		$("#lastHeard").val(utter);
		var utterThis = new SpeechSynthesisUtterance(utter);
		synth.speak(utterThis);
	}
  // Add our commands to annyang
  annyang.addCommands(commands);
}