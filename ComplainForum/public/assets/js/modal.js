$(document).ready(function(){
  $(".btn-success").click(function(){
  		var name = this.id;
    	$("#myModal").modal();

    	$.getJSON("/Users/?username="+name,function(data , status){
    		$("#email").val(data[0].email);
    		$("#editForm").attr("action","/Users/"+data[0]._id);
    		$("#name").val(data[0].username);
       	});

  });
  $(".btn-danger").click(function(){

  	var user = $(this).attr('data-value');

  	var con = confirm("Do you want to delete user? "+ user);
  	if (con) {
  		$.getJSON("/Users/?username="+user,function(data, status){
  			$.ajax({
  				url:'/Users/'+data[0]._id,
  				type: 'DELETE',
  				success: function(data){

  					if(data=="Success"){
  						alert(user + " deleted");
  						location.reload();
  					}	
  				}

  			});
  		});
  	}

  });
  $("#add").click(function(){
    $("#myModal").modal();
    $("#email").val('');
    $("#name").val('');
    $("#editForm").attr("action","/Users?role=admin");
    $(".modal-title").text("Add Admin");
  });
});