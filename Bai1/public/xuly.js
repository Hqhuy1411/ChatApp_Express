$(document).ready(function(){
    const socket = io();
    $('#btnRegister').click(()=>{
        if($('#txtUsername').val()!==""){
            socket.emit("client-send-Username",$('#txtUsername').val());
        }
    })
    $('#btnLogout').click(()=>{
        socket.emit("logout");
        $('#loginForm').show(1000);
        $("#chatForm").hide(1000)
    });
    $('#btnSend').click(()=>{
        if($('#txtMessage').val()!==""){
            socket.emit("client-send-message",$('#txtMessage').val());
        }
    });
    // $('#txtMessage' ).focusin(function() {
    //     socket.emit('toi-dang-go');
    // });
    // $('#txtMessage' ).focusout(function() {
    //     socket.emit('toi-stop-go');
    // });

    socket.on('Dangki-thatbai',()=>{
        alert('Tai khoan da co nguoi khac dang ki')
    });
    socket.on('Dangki-thanhcong',(data)=>{
        $('#currentUser').html(' '+ data);
        $('#loginForm').hide(1000);
        $("#chatForm").show(1000)
    });
    socket.on('Danhsach-User',(data)=>{
        $('#boxContent').html("")
        data.forEach(function(i)  {
            $('#boxContent').append("<div class='user'>"+i+"</div>")
            
        });
    });
    socket.on('Server-send-message',(data)=>{
        $('#listMessage').append("<div class='message'>"+data.un +" :"+data.dt+"</div>")
    })
    // socket.on('ai-do-dang-go',(data)=>{
    //     $('#somebody').html(data);
    // })
    // socket.on('ai-do-stop-dang-go',(data)=>{
    //     $('#somebody').html("");
   // })
    $('#loginForm').show();
    $("#chatForm").hide()
})