const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library
var isprofanity = require("isprofanity"); //imports filter file
const client = new Discord.Client(); // creates a discord client
const config = require("./config.json"); // gets your token and prefix from the file
const getMention = require('discord-mentions'); 

var customSensitivity = 0.4; //filter sensitivity

//setting up mysql
const {createConnection} = require("mysql"); //integrating mysql database to js
let con = createConnection(config.mysql); //connecting to mysql

con.connect(err => { // Check if connection to sql server is successful
    if (err) return console.log(err); // Console log if there is an error
    console.log("MySQL has been connected!");  // Connection established
	//var addMoney = "UPDATE swearjar SET SwearTotal= SwearTotal + 1 WHERE UserID= {msg.author}"
});

var prefix = (config.prefix); //import prefix
client.on("message", (msg) => { // runs whenever a message is sent 
	if (msg.author.bot) return; //ignores dm messages

	//bot commands
	if (msg.content.startsWith(prefix + "test")) {
		msg.channel.send("I AM STILL ALIVE");	
	}
	if (msg.content.startsWith(prefix+"love")) { 
		let tagged = msg.mentions.members.first();
		if(!tagged) return msg.channel.send("I love you <@" +msg.author+ ">" );
			 msg.channel.send("From: <@" +msg.author+ "> I love you <@" +tagged+ ">" );
	}

	//profanity filter
	isprofanity(msg.content,function(t){// t will equal true if it contains a swear word and false if not
	if (t==true){
		msg.reply("is donating RM1 to the swear jar, F IN THE CHAT BOIS <@306087961898778634>");
		
	}else if (t==false){
		isprofanity(msg.content.replace(/ /g,""),function(t){
		if (t==true){
			msg.reply("is donating RM1 to the swear jar, F IN THE CHAT BOIS <@306087961898778634>");
		}
		},'data/profanity.csv','data/exceptions.csv',customSensitivity);
	}
	},'data/profanity.csv','data/exceptions.csv',customSensitivity);
	
});

client.once("ready", () => { // prints "Ready!" to the console once the bot is online
	console.log("Bot Ready!");
});

client.login(config.token); // starts the bot up