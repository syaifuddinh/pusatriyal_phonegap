function pembayaran_view(dom){
	var el = $(dom);

	var id = parseInt(el.find('#sm_id').val());

	var tes;
	console.log('preview-pambayaran');
	console.log(units);
	for(var a=0; a<units.length;a++){
		tes = units[a];
		if(tes.sm_id === id){
			bayar_json = tes;
			console.log('if statement is true');
		}
	}
	$('#sm_id').val(bayar_json.sm_id);
	$('[name="tagihan"]').val(bayar_json.sm_net);
	$('#tagihan').val(accounting.formatNumber(bayar_json.sm_net, 0, '.', ','));

}