var oscPort = new osc.WebSocketPort({
    url: "ws://localhost:8000", // URL to your Web Socket server.
    metadata: true
});

oscPort.open();

oscPort.on("ready", function () {
    oscPort.send({
        address: "a",
        args: [
            {
                type: "f",
                value: 440
            }
        ]
    });
});