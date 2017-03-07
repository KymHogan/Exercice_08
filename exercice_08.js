var http = require('http');
var fs = require('fs');
var url = require('url');
 var obj;

// Créer un serveur
http.createServer( function (request, response) {  
   // On extrait de la requête «request» le chemin  qui nous donnera le nom de fichier
   var pathname = url.parse(request.url).pathname;
   
 
   console.log("request.url = " + request.url)
   console.log("url.parse(request.url).pathname = " + url.parse(request.url).pathname)
  // affiche le nom du fichier pour laquelle la requête a été généré
   console.log("Request for " + pathname + " received.");
   

   // Lire par le «fs» (file système) le fichier de la requête 
   // le slice(1) permet de retirer le premier caractère
   fs.readFile(pathname.slice(1) + ".json", function (err, data) {
      var chemin = pathname.slice(1);
	  if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else { 
		 obj = JSON.parse(data);
		 
		 function ecritureTableauProvince(obj){

			var sChaine = "";

			sChaine += "<h1>Tableau de provinces</h1>";
			sChaine += "<table>";
			for (chemin in obj){

				sChaine += "<tr><td>" + chemin + "</td><td>" + obj[chemin].toString() + "</td></tr>";
			}
			sChaine += "</table>";

			return sChaine;
		}

         //Page found   
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});  
         
         // affiche le contenu du fichier dans la page HTML
         response.write(ecritureTableauProvince(obj));   
      }
      // transmet la reponse  
      response.end();
   });   
}).listen(8081);

// message console
console.log('Serveur se trouvant à http://127.0.0.1:8081/');



