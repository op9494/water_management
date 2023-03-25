function navtab(tab){
    $(".sidebar__inner>ul>li>a").removeClass("active");
    
    if(tab=="logout"){
        window.location.href="/logout";
    }
    else if(tab){
        $(".sub-continer").hide();
        $("."+tab).show();
    }
    

    $("#"+tab).addClass("active")
}
$(document).ready(function() { 
    const params = new URLSearchParams(window.location.search)
    const action = params.get('action') 
    $(".sub-continer").hide();



    navtab(action)
    console.log("{{action}}")
    if ("{{action}}"=="logout"){
        navtab("logout")
    }
    navigator.geolocation.getCurrentPosition(getLatLon)
    function getLatLon(position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude
      console.log("location", latitude,typeof longitude)
      $("#eqadd_lattitude").val(latitude);
      $("#eqadd_longitude").val(longitude);
    
    }

 });



