var g = G$("Bob", "Robertson");
g.greet();
g.greet().setLang('en').greet(true).log();

$('#login').click(function() {

	var loginGrtr = G$('Jane', 'Doe');

	$('#logindiv').hide();

	loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});