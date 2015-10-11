var express = require("express"),
	app = express(),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ "extended": "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride());

app.post("/api/userdata", function(req, resp) {
	console.log(req.body);
	resp.send("SUCCESS!");
});

app.get("*", function(req, resp) {
	resp.sendfile("./public/index.html");
});

app.listen(8080);
console.log("App listening on port 8080");

