window.onload = init;
var keys = ['bio','avatar','contact','handle','second_name','first_name']
function init(){
    remoteStorage.claimAccess({profile : 'rw'});
    remoteStorage.displayWidget();
    f = document.forms.profile;
    output = document.all.output;
    to_profile_link = document.all.profile_link
    f.avatar.onchange = function(e){
	console.log(e);
	document.all.avatar_img.src = this.value;
    }
    gui_reload();
}

function gui_save(){
    var data = new Object;
    data.avatar      = f.avatar.value;
    data.first_name  = f.first_name.value;
    data.second_name = f.second_name.value;
    data.handle      = f.handle.value;
    data.contact     = f.contact.value;
    data.bio         = f.bio.value;
    return remoteStorage.profile.save(data);
}

function gui_reload(){
    remoteStorage.profile.load().then(reload)
    update_link();
}
function reload(data){
    f.avatar.value      = data.avatar;
    document.all.avatar_img.src = data.avatar;
    f.first_name.value  = data.first_name;
    f.second_name.value = data.second_name;
    f.handle.value      = data.handle;
    f.contact.value     = data.contact;
    f.bio.value         = data.bio;
    return data;
}

function gui_create(){
    gui_save();
    return remoteStorage.profile.template().then(
       function(template){
	   var data = template.data;
	   keys.forEach(
	       function(key){
		   data = data.replace(new RegExp('(\\$' + key + ')', 'g'), f[key].value);
		   console.log('data now', data);
	       }
	   )
	   output.contentDocument.documentElement.innerHTML = data;
	   return data;
       }
   )
   
}

function gui_deploy(){
    return gui_create().then(function(page){
	remoteStorage.profile.deploy(page).then(update_link)
    });
}

function update_link(){
    to_profile_link.onclick = function(){
	window.open(remoteStorage.profile.link());
    }
}
