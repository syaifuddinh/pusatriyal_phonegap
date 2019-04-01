function display_manasik_plan(obj) {
	$('#nota').val(obj.mp_code);
	$('#tgl_kegiatan').val(obj.mp_date);
	$('#tempat_kegiatan').val(obj.mp_place);
	$('#pic').val($(obj.petugas_pic).text());
	$('#kegiatan').val(obj.mp_plan_activity);
	$('#pet_1').val(obj.emp_1.m_name);
	$('#pet_2').val(obj.emp_2.m_name);
	$('#pet_3').val(obj.emp_3.m_name);
	$('#mp_id').val(obj.mp_id);
	$('#btn-edit').append('<input type="hidden" name="mp_id" id="mp_id" value="'+ obj.mp_id +'">')
}

function preview_manasik_plan(dom) {
	 el = $(dom);
	
	var id = el.find('#id_perencanaan').val();

	$('#tgl_kegiatan').val('abc');

	var tes;

	for (var i = 0; i < units.length; i++) {
		tes = units[i];
		if (tes.mp_id === id) {
			preview_manasik_json = tes;
			display_manasik_plan(preview_manasik_json);
		}
	}
	
	console.log('object terpilih');
	
}

$(document).ready(function(){
	$.ajax({
	      url: url('api/marketing/manasik/perencanaan/list_perencanaan'),
	      type    : 'get',
	      dataType : 'json',
	      success : function(resp){
	      	var card = $('.card');
	        units = resp.data;
	        var unit, rawcontent, content;
	        if(units.length > 0) {
	        	rawcontent = $('rawcontent.datalist').html();
	        	for(x = 0;x < units.length;x++) {
	        		unit = units[x];
	        		console.log(unit);
	        		content = $(rawcontent);
	        		content.append('<input type="hidden" name="id_perencanaan" id="id_perencanaan" value="'+ unit.mp_id +'">')
	        		// Set-up routing untuk menampilkan preview
	        		content.attr('pusatriyal-role', 'routing');
	        		content.attr('pusatriyal-target', 'includes/manasik/perencanaan_manasik/preview-perencanaan.html');
	        		content.attr('pusatriyal-callback', 'preview_manasik_plan');
	        		content.append(
	        			'<input type="hidden" name="mp_id" value="' + unit.mp_id + '">'
	        		)
	        		content.find('.card-title').text( 
	        			unit.mp_code
	        		);
	        		content.find('.card-subtitle').text( 
	        			unit.mp_place
	        		);
	        		content.find('.card-info-first').text( 
	        			$(unit.tgl).text()
	        		);
	        		content.find('.card-info-second').text( 
	        			$(unit.status).text()
	        		);

	        		$('.card').append(content);
	        	}

	        	Routing.load_routing();
	        }
	        else {
	        	card.html('<div class="card-body"><h4 class="card-title">Tidak Ada Data Yang Ditampilkan</h4></div>')
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

    
});