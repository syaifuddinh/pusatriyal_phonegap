var counter_strike__battefield = 0;
$('#btn-append').click(function(){
	$('#form-list-item').append(
		'<div class="accordion">'+
	        '<div class="card">'+
	          '<div class="card-header bg-success header-collapse p-0" id="header-'+ counter_strike__battefield +'">'+
	            '<h5 class="mb-0">'+
	              '<button class="btn btn-link btn-block btn-header text-white collapsed" type="button" data-toggle="collapse" data-target="#collapse-'+ counter_strike__battefield +'" aria-expanded="true" aria-controls="collapse-'+ counter_strike__battefield +'">'+
	                'BRG/0001 - 10 Riyal'+
	              '</button>'+
	            '</h5>'+
	          '</div>'+

	          '<div id="collapse-'+ counter_strike__battefield +'" class="collapse datalist-collapse" aria-labelledby="header-'+ counter_strike__battefield +'" data-parent="#form-list-item">'+
	            '<div class="card">'+
	              '<div class="card-body card-forlist p-3">'+

	                '<table class="w-100 table-accordion">'+
	                  '<tr>'+
	                    '<th>Qty Sistem</th>'+
	                    '<td>'+
	                      '<div class="input-group">'+
	                        '<input type="text" readonly="" class="form-control" name="">'+
	                        '<div class="input-group-append">'+
	                          '<span class="input-group-text">Lembar</span>'+
	                        '</div>'+
	                      '</div>'+
	                    '</td>'+
	                  '</tr>'+
	                  '<tr>'+
	                    '<th>Satuan</th>'+
	                    '<td><input type="text" readonly="" class="form-control" name=""></td>'+
	                  '</tr>'+
	                  '<tr>'+
	                    '<th>Qty Real</th>'+
	                    '<td>'+
	                      '<div class="input-group">'+
	                        '<input type="number" class="form-control" name="">'+
	                        '<div class="input-group-append">'+
	                          '<span class="input-group-text">Lembar</span>'+
	                        '</div>'+
	                      '</div>'+
	                    '</td>'+
	                  '</tr>'+
	                '</table>'+

	              '</div>'+
	              '<div class="card-footer">'+
	                '<small for="opname_dt[]">Opname</small>'+
	                '<select class="" id="opname_dt" name="opname_dt[]">'+
	                  '<option selected="" value="N">-</option>'+
	                  '<option value="H">Hilang</option>'+
	                  '<option value="R">Rusak</option>'+
	                '</select>'+
	                '<button class="btn btn-danger btn-sm btn-hapus pull-right btn-hapus-accordion" type="button"><i class="fa fa-trash-o"></i> Hapus</button>'+
	              '</div>'+
	              ''+
	            '</div>'+
	          '</div>'+
	        '</div>'+
	    '</div>'
		);
	counter_strike__battefield++;
});

$('#form-list-item').on('click', '.btn-hapus-accordion', function(){
	$(this).parents('.accordion').remove();
})