import ws from 'k6/ws';
import { check } from 'k6';

var counter = 1;

export default function () {  
  const url =  'wss://testgigalixir.gigalixirapp.com/socket/websocket?token=undefined&vsn=2.0.0'
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
        //console.log('connected');
        //socket.send(JSON.stringify(['1', new String(counter++),'calibration','phx_join', {}]));
                
        socket.setInterval(function timeout() {
          socket.send(JSON.stringify([null, new String(counter++),'phoenix','heartbeat', {}]));
        //  console.log('Pinging every 1sec (setInterval test)');
        }, 10000);

        //socket.setInterval(function timeout() {
          //socket.send(JSON.stringify([null, new String(counter++),'phoenix','heartbeat', {}]));
        //  socket.close();
          //console.log('Pinging every 1sec (setInterval test)');
        //}, 59900);
        socket.setTimeout(function() {
          socket.close();
        }, 59900);

      });


    socket.on('message', (data) => console.log('Message res received: ', data));
    socket.on('close', () => console.log('disconnected'));
    socket.on('error', function(e) {
        if (e.error() != "websocket: close sent") {
            console.log('An unexpected error occured: ', e.error());
          }
    })
  });

  

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
