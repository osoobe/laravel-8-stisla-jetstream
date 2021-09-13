window.subDetailFormater = (html, key, value) => {
	if (key == 'id') {
		return '';
	}
	if (value instanceof Object == false) {
		if (isUrl(value)) {
			value = `<a target="applicant" href="${value}">${value}</a>`;
		}
		html.push('<p><b>' + key.replace(/\_/g, ' ') + ':</b> ' + value + '</p>');
	} else {
		html.push(`<b>${key}:</b><div style="padding-left: 20px">`);
		for (let subkey in value) {
			subDetailFormater(html, subkey, value[subkey]);
		}
		html.push(`</div>`);
	}
}

window.detailFormatter = (index, row) => {
	var html = []
	$.each(row, function (key, value) {
		subDetailFormater(html, key, value);
	})
	return html.join('');
}


window.btnUrlFormatter = (value, row, index) => {
	console.log(value, row, index);
  return [
	`<a class="btn btn-primary btn-sm" target="job" href="${row.url}" title="${row.title}">
	  <i class="fa fa-eye"></i>
	  View
	</a>`
  ].join('')
}



window.delete_alert = (id) => {

	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	})

	swalWithBootstrapButtons.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		reverseButtons: true
	}).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				type: 'GET',
				url: app_url + "/delete-alert/" + id,
				success: function (response) {
					if (response["status"] == true) {
						$('#delete_' + id).hide();
						swal({
							title: "Success",
							text: response["msg"],
							icon: "success",
							button: "OK",
						});

					} else {
						swal({
							title: "Already exist",
							text: response["msg"],
							icon: "error",
							button: "OK",
						});
					}

				}
			});
		} else if (
			/* Read more about handling dismissals below */
			result.dismiss === Swal.DismissReason.cancel
		) {
			swalWithBootstrapButtons.fire(
				'Cancelled',
				'Your job alert is safe :)',
				'error'
			)
		}
	})
}
