  $.ajax({
    url:url('api/find_m_mem'),
    type:'get',
    success:function(res){
    	$('#employe1').html('');
    	$('#employe2').html('');
    	$('#employe3').html('');
      for(var a=0;a<res.length;a++){
        $('#employe1').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
        $('#employe2').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
        $('#employe3').append('<option value="'+res[a].m_id+'">'+res[a].m_name+'</option>')
      }
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

});

  $('#employe1').select2();
  $('#employe2').select2();
  $('#employe3').select2();

  $.ajax({
  	url:url('api/marketing/manasik/pelaksanaan_kegiatan/getcode'),
  	type:'get',
  	dataType:'json',
  	success:function(res){
		$('#idplan').html('');  
  		
  		var data;
  		for(var a = 0; a<res.length; a++){
  			data = res[a];
			$('#idplan').append('<option value="'+ data.mp_id +'">'+ data.mp_code +'</option>');
  		}
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
  });

$('#idplan').change(function(){
	$('#produk').html('');

	$.ajax({
		url:url('api/kode_pelaksanaan_terpilih'),
		type:'get',
		dataType:'json',
		data:{
			id:$(this).val()
		},
		success:function(res){
			console.log(res);
			data = res.data;
			item = res.item;
			petugas = res.petugas

			$('#employe1').val(data.mp_employe1).trigger('change');
			$('#employe2').val(data.mp_employe2).trigger('change');
			$('#employe3').val(data.mp_employe3).trigger('change');

			for(var b = 0;b<item.length;b++){
				var barang = item[b];
				var appendx = '<option value="'+ barang.ir_id +'">'+ barang.ir_code +' - '+ barang.ir_name +'</option>';
				$('#produk').append(appendx);
			}
		}
	})
});