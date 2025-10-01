let clients = [];

function updateHandler(req, res) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };

  res.writeHead(200, headers);

  const clientid = Date.now();
  const newClient = {
    id: clientid,
    res
  };
  clients.push(newClient);

  console.log("New client connected", clientid);

  // Send initial message
  res.write("event: establish\ndata: Server\n\n");

  req.on("close", () => {
    console.log("Client closed connection", clientid);
    clients = clients.filter(client => client.id !== clientid);
  });
}

export { updateHandler, clients };
