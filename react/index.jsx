import React, { Component } from 'react';
import { render } from 'react-dom';
import App from "./app.jsx";

render(
	<App />,
	document.getElementById("root")
);

document.getElementById("profile").addEventListener("click", function(e) {
    var popover = document.getElementById("popover-arrow");
    if (popover.classList.contains("hidden")) {
        popover.classList.remove("hidden");
    }
    else {
        popover.classList.add("hidden");
    }
});

document.addEventListener("click", function(e) {
    var popover = document.getElementById("popover-arrow");
    var menu = document.getElementById("menu");
    if ((!menu.contains(e.target) && !document.getElementById("profile").contains(e.target)) || e.target == menu) {
        popover.classList.add("hidden");
    }
});