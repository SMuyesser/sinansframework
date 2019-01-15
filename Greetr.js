(function(global, $) {

	// G$ points to this greetr function which returns a new Greetr.init
	var Greetr = function(firstname, lastname, language) {
		return new Greetr.init(firstname, lastname, language);
	};

	// These are available to our Greetr function, but not globally because of closure
	var supportedLangs = ['en', 'es'];

	greetings = {
		en: 'Hello',
		es: 'Hola'
	};

	formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};

	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	};

	// Methods go in prototype to save memory, yet remain accessible to all obj created from it
	Greetr.prototype = {

		fullName: function() {
			return this.firstname + ' ' + this.lastname;
		},

		validateLang: function() {
			if (supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},

		greeting: function() {
			return greetings[this.language] + ' ' + this.firstname +'!';
		},

		formalGreeting: function() {
			return formalGreetings[this.language] + ' ' + this.fullName();
		},

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
				console.log(logMessages[this.languages] + ': ' + this.fullName());
			}

			return this;
		},

		setLang: function(lang) {
			this.language = lang;
			this.validateLang();
			return this;
		}

	};

	// Greetr.init builds the object & setting the values
	Greetr.init = function(firstname, lastname, language) {

		var self = this;

		self.firstname = firstname || "";
		self.lastname = lastname || "";
		self.language = language || "en";

	};

	// Any object created with this function point to Greetr.init so it has 
	// access to all the methods we created
	Greetr.init.prototype = Greetr.prototype;

	// Makes our Greetr object available on the global object with name G$
	global.Greetr = global.G$ = Greetr;

}(window, jQuery));