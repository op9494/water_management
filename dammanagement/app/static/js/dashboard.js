function navtab(tab){
    $(".sidebar__inner>ul>li>a").removeClass("active");
    
    if(tab=="renteqp"){
        $("."+tab).show();
        $(".checkimg").hide();
        $(".viewdams").hide();
        $(".addeqpage").hide();
        $(".accountpage").hide();
    }
    else if(tab=="checkimg"){
        $("."+tab).show();
        $(".renteqp").hide();
        $(".viewdams").hide();
        $(".addeqpage").hide();
        $(".accountpage").hide();
    }
    else if(tab=="viewdams"){
        $("."+tab).show();
        $(".renteqp").hide();
        $(".checkimg").hide();
        $(".addeqpage").hide();
        $(".accountpage").hide();
    }
    else if(tab=="addeqpage"){
        $("."+tab).show();
        $(".renteqp").hide();
        $(".checkimg").hide();
        $(".viewdams").hide();
        $(".accountpage").hide();
    }
    else if(tab=="accountpage"){
        $("."+tab).show();
        $(".renteqp").hide();
        $(".checkimg").hide();
        $(".viewdams").hide();
        $(".addeqpage")
    }

    $("#"+tab).addClass("active")
}
$(document).ready(function() { 
    const params = new URLSearchParams(window.location.search)
    const action = params.get('action') 
    $(".checkimg").hide();
    $(".viewdams").hide();
    $(".addeqpage").hide();
    $(".accountpage").hide();


    navtab(action)
    navigator.geolocation.getCurrentPosition(getLatLon)
    function getLatLon(position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude
      console.log("location", latitude,typeof longitude)
      $("#eqadd_lattitude").val(latitude);
      $("#eqadd_longitude").val(longitude);
    
    }

 });



