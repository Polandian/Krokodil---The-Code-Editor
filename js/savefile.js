//TODO MAKE A SAVE FUNC AND CALL IT AT THE caret.js
function save(){
	var file = document.querySelectorAll(".textEditorLine")
	var saveFile = []
	var fileName = document.getElementById("codeEditorTabName").innerText.substring(0, document.getElementById("codeEditorTabName").innerText.length - 3)

	for (var i = 0; i < file.length; i++){
		var j = file[i].textContent
		saveFile.push(j + "\n") //creates array of lines
		j = undefined
	}

	var link = document.createElement("a")
	link.href = window.URL.createObjectURL(new Blob(saveFile, {type: "text/plain"}))
	link.download = fileName
	link.click()
	link.remove()

	file = undefined
	saveFİle = undefined
	fileName = undefined
}
