"use strict";
const DOMAIN = "https://hackpsu20.herokuapp.com";

function shade(color, percent) {
	if (color.length > 7) return shadeRGBColor(color, percent);
	else return shadeHexColor(color, percent);
}

function shadeHexColor(color, percent) {
	var f = parseInt(color.slice(1), 16),
		t = percent < 0 ? 0 : 255,
		p = percent < 0 ? percent * -1 : percent,
		R = f >> 16,
		G = (f >> 8) & 0x00ff,
		B = f & 0x0000ff;
	return (
		"#" +
		(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
	);
}

function normalize(val, max, min) {
	return (val - min) / (max - min);
}

function reloadMapScript() {
	var mapScript = document.createElement("script"); // create a script DOM node
	mapScript.src = "https://dvtung1.github.io/Electoral_Graphs/usmap.js"; // set its src to the provided URL
	document.head.appendChild(mapScript);
}

function main() {
	let res = window.localStorage.getItem("data");
	if (res == null) {
		res = $.ajax({
			url: `${DOMAIN}/api/map/power`,
			type: "GET",
			async: false,
		});
		res = res.responseJSON;
		window.localStorage.setItem("data", JSON.stringify(res));
	} else {
		res = JSON.parse(res);
	}

	let tempArr = [];
	let tempArr2 = [];
	let stateInfoObj = {};
	for (let state in res.result) {
		stateInfoObj[state] = res.result[state];
		tempArr.push(res.result[state]);
		tempArr2.push(res.otherInfo[state][2]);
	}

	let stateColorObj = {};
	const minVal = Math.min(...tempArr);
	const maxVal = Math.max(...tempArr);
	for (let state in stateInfoObj) {
		const normalizedValue = Math.round((1 - normalize(stateInfoObj[state], maxVal, minVal)) * 10) / 10;
		stateColorObj[state] = shade("#008000", normalizedValue);
	}
	let stateColorObj2 = {};
	const minVal2 = Math.min(...tempArr2);
	const maxVal2 = Math.max(...tempArr2);
	for (let state in res.otherInfo) {
		const normalizedValue = Math.round((1 - normalize(res.otherInfo[state][2], maxVal2, minVal2)) * 10) / 10;
		if (normalizedValue < 0.5) {
			stateColorObj2[state] = shade("#FF0000", normalizedValue);
		} else {
			stateColorObj2[state] = shade("#0000FF", 1 - normalizedValue);
		}
	}

	const location = window.localStorage.getItem("location");
	if (location == null && window.navigator.geolocation) {
		window.navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			const tempObj = { name: "Your location", lat: latitude, lng: longitude };
			window.localStorage.setItem("location", JSON.stringify(tempObj));
			simplemaps_usmap_mapdata["locations"]["0"] = tempObj;
			reloadMapScript();
		});
	} else if (location != null) {
		simplemaps_usmap_mapdata["locations"]["0"] = JSON.parse(location);
	}
	reloadMapScript();
	if (!$(".spinner-border").hasClass("d-none")) {
		$(".spinner-border").addClass("d-none");
	}

	$("#power").click(() => {
		for (let state in stateColorObj) {
			simplemaps_usmap_mapdata["state_specific"][state]["color"] = stateColorObj[state];
			const description = `Num electoral votes: ${res.otherInfo[state][0]}. Num population: ${res.otherInfo[state][1]}`;
			simplemaps_usmap_mapdata["state_specific"][state]["description"] = description;
		}
		reloadMapScript();
		$("#powerDescription").removeClass("d-none");
		if (!$("#racialDescription").hasClass("d-none")) {
			$("#racialDescription").addClass("d-none");
		}
		if ($("#racial").hasClass("active")) {
			$("#racial").removeClass("active");
		}
		$("#power").addClass("active");
	});

	$("#racial").click(() => {
		for (let state in stateColorObj2) {
			simplemaps_usmap_mapdata["state_specific"][state]["color"] = stateColorObj2[state];
			const description = `White percentage: ${res.otherInfo[state][2]}`;
			simplemaps_usmap_mapdata["state_specific"][state]["description"] = description;
		}
		reloadMapScript();
		$("#racialDescription").removeClass("d-none");
		if (!$("#powerDescription").hasClass("d-none")) {
			$("#powerDescription").addClass("d-none");
		}
		if ($("#power").hasClass("active")) {
			$("#power").removeClass("active");
		}
		$("#racial").addClass("active");
	});
}

main();
