angular.module('starter.controllers')

.controller('SyncCtrl', function($scope, $q, $rootScope, $cordovaSQLite, $cookies, sync){
	$scope.sync=function(){
		var res = sync.clients();
		res.then(function(){
			console.log(res.$$state.value.data.clients);
			var req = "INSERT INTO clients VALUES (?,?,?,?,?,?,?,?,?)";
			clients = res.$$state.value.data.clients;
			clients.forEach(function(clt, index){
				console.log(clt.id);
				var param = [
					clt.id,
					clt.code,
					clt.nom,
					clt.adr1,
					clt.cp,
					clt.ville,
					clt.id_pays,
					clt.marche,
					clt.commentaire
				]
				$cordovaSQLite.execute(db, req, param);
			});
		},function(reason){
			console.log(reason);
		});
	}
})

$cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS clients (id integer primary key, code text, nom text, adr text, cp text, ville text, id_pays integer, market text, commentaire text)');
