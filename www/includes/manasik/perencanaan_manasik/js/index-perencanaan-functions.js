function preview_data(obj){
	counttime = setInterval(function(){
		if( pusatriyal_loading == true ) {
			clearInterval(counttime);
			$('#mp_code').html( obj.mp_code );
			$('#petugas_pic').html( obj.petugas_pic );
			$('#mp_plan_activity').html( obj.mp_plan_activity );
 		}
	}, 500)
}