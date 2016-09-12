$(function() {
	$('#match_yc_date').on('tap', function() {
		var _this = $(this);
		var dtPicker = new mui.DtPicker({
			type: 'date'
		});
		dtPicker.show(function(rs) {
			console.log(rs);
			_this.val(rs.value)
		})
	});

	$('#match_fw_day .small-text').on('tap', function() {
		$('#match_fw_day').find('.btn').removeClass('on')
	});
	
	$('#match_submit').on('tap',function(){
		
	})
})