const socket = io('http://' + document.domain + ':' + location.port)

socket.on('connect', () => {
    socket.emit('event', {
        data: 'User Connected'
    })

    var form= $('form').on('submit', (e) => {
        e.preventDefault
        
        let username = $('input.username').val()
        let message = $('input.message').val()

        socket.emit('event', {
            _username: username,
            _message: message
        })

        $('input.message').val('').focus()
    })
})

socket.on( 'response', ( msg ) => {
    console.log( msg )
    if( typeof msg._username !== 'undefined' ) {
      $( 'div.message-container' ).append( '<div><b style="color: #000">'+msg._username+'</b> '+msg._message+'</div>' )
    }
})