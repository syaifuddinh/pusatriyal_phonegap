$(document).ready(function(){
	
	$('#tgl_perencanaan32').datepicker({
		format:'yyyy-mm-dd'
	});
	$('.select2').select2();

	$('#btn-update').click(function(){
		$.ajax({
			url:url('api/marketing/manasik/perencanaan/update_perencanaan/'+$('#mp_id').val()),
			type:'post',
			data:$('#login-form').serialize(),
			success:function(res){
				console.log(res);
				iziToast.success({
					title:'Sukses',
					message:'Data berhasil diperbarui'
				});

				Routing.load_page('includes/manasik/perencanaan_manasik/index-perencanaan.html');
			},
			error: function(jqXHR, exception) {
		      if (jqXHR.status === 0) {
		          alert('Not connect.\n Verify Network.');
		      } else if (jqXHR.status == 404) {
		          alert('Requested page not found. [404]');
		      } else if (jqXHR.status == 500) {
		          alert('Internal Server Error [500].');
		      } else if (exception === 'parsererror') {
		          alert('Requested JSON parse failed.');
		      } else if (exception === 'timeout') {
		          alert('Time out error.');
		      } else if (exception === 'abort') {
		          alert('Ajax request aborted.');
		      } else {
		          alert('Uncaught Error.\n' + jqXHR.responseText);
		      }
		    }
		})
	});
});