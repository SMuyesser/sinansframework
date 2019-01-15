(function(global, $) {

	// 'new' an object
	// G$ points to this greetr function which returns a new Greetr.init
	var Greetr = function(firstname, lastname, language) {
		return new Greetr.init(firstname, lastname, language);
	};

	// These are available to our Greetr function, but not globally because of closure
	// hidden within the scope of the IIFE and never directly accessible
	var supportedLangs = ['en', 'es'];

	// informal greetings
	greetings = {
		en: 'Hello',
		es: 'Hola'
	};

	// formal greetings
	formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};

	// logger messages
	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	};

	// Methods go in prototype to save memory, yet remain accessible to all obj created from it
	Greetr.prototype = {

		// 'this' refers to the calling object as execution time
		fullName: function() {
			return this.firstname + ' ' + this.lastname;
		},

		// references the externally inaccessible 'supportedLangs' within the closure
		// checks that it is a valid language
		validateLang: function() {
			if (supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},

		// retrieve messages from object by referring to properties using [] syntax
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstname +'!';
		},

		formalGreeting: function() {
			return formalGreetings[this.language] + ' ' + this.fullName();
		},

		// chainable methods return their own containing object
		greet: function(formal) {
			var msg;

			// if undefined or null, it will be coerced to 'false'
			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			};

			if (console) {
				console.log(msg);
			};

			// 'this' refers to the calling object at execution time
			// makes the method chainable
			return this;
		},

		log: function() {
			if (console) {
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}

			// makes chainable
			return this;
		},

		setLang: function(lang) {
			// set language
			this.language = lang;
			// validate
			this.validateLang();
			// chainable
			return this;
		},

		HTMLGreeting: function(selector, formal) {
			if (!$) {
				throw 'jQuery not loaded';
			}

			if (!selector) {
				throw 'Missing jQuery selector'
			} 

			// determine the message
			var msg;
			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			};

			// inject the message in the chosen place in the DOM
			$(selector).html(msg);

			// make chainable
			return this;
		}

	};

	// Greetr.init builds the object & setting the values
	// The actual object is built here, allowing us to 'new'
	// an object without calling 'new'
	Greetr.init = function(firstname, lastname, language) {

		var self = this;

		self.firstname = firstname || "";
		self.lastname = lastname || "";
		self.language = language || "en";

		self.validate();

	};

	// Any object created with this function point to Greetr.init so it has 
	// access to all the methods we created
	// trick from jQuery so we don't have to use the 'new' keyword
	Greetr.init.prototype = Greetr.prototype;

	// Makes our Greetr object available on the global object with name with shorthand 'G$''
	global.Greetr = global.G$ = Greetr;

}(window, jQuery));