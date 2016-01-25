var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.index;
handle["/index"] = requestHandlers.index;
handle["/settings"] = requestHandlers.settings;
handle["/params"] = requestHandlers.params;
handle["/customers"] = requestHandlers.customers;

server.start(router.route, handle);