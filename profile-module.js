remoteStorage.defineModule('profile', 
  function(privateClient, publicClient){
      publicClient.declareType('profile', {
	  'type' : 'object',
	  'properties' : {
	      'first_name' : {
		  'type' : 'string'
	      },
	      'second_name' : {
		  'type' : 'string'
	      },
	      'handle' : {
		  'type' : 'string',
		  'required' : 'true'
	      },
	      'contact': {
		  'type' : 'string'
	      },
	      'avatar' : {
		  'type' : 'string'
	      },
	      'bio'  : {
		  'type' : 'string'
	      }
	  },
      })
      var a = publicClient.schemas;
      var keys = Object.keys(a[Object.keys(a)[0]].properties);
      return {
	  'exports' : {

	      pub: publicClient,

	      'save' : function(data){
		  publicClient.getObject('me').then( 
		      function(old_data){
			  keys.forEach( function(k){
			      if(data[k]===undefined)
				  data[k] = old_data[k]
			  })
			  return publicClient.storeObject('profile', 'me',data);
		      
		      }
		  )		  
	      },
	      'template' : function(){
		  return publicClient.getFile('template');
	      },
	      'load' : function(){
		  return publicClient.getObject('me');
	      },
	      'deploy' : function(page){
		  return publicClient.storeFile('text/html', 'profile.html', page, false)
	      },
	      'link' : function(){
		  return publicClient.getItemURL('profile.html');
	      }
	   
	  }
      }
  });
