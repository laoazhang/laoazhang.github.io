// Konami code	
var cat = document.createElement('img');
	cat.id = 'roombaCat';
	cat.src = '/assets/images/avatar.jpg';

var k = new Konami(function(){
	cat.classList.add('animate');
	document.body.appendChild(cat);
});

