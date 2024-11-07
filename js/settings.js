let relativeLines = {name: "relativeLines", value: false}
let fullscreen = {name: "fullscreen", value: false}

const allSetting = [relativeLines, fullscreen]

function changeSetting(y){ //change setting
	localStorage.setItem(y, document.getElementById(y).checked)
	eval(y).value = (localStorage.getItem(y) === "true")
}

for(var i = 0; i < allSetting.length; i++){ //loads all settings
	allSetting[i].value = (localStorage.getItem(allSetting[i].name) === "true")
	document.getElementById(allSetting[i].name).checked = allSetting[i].value
}
