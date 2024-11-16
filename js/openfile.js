document.getElementById("fileSelect").addEventListener("change", () => {
	var file = document.getElementById("fileSelect").files[0]
	console.log(file)
	var reader = new FileReader()

	reader.readAsText(file)

	reader.onload = () => {
		var i = reader.result
		var j = i.split(/[\r\n]+/g)

		//Removes current file
		document.getElementById("lineNumber").innerHTML = ""
		document.getElementById("textEditor").innerHTML = ""

		var _ec = document.createElement("div")
		_ec.id = "editorCursor"
		document.getElementById("textEditor").appendChild(_ec)

		//File Loader
		for(var l = 0; l < j.length; l++){
			var newText = document.createElement("div")
			newText.classList.add("textEditorLine")
			newText.innerHTML = j[l].replace("\t", "&nbsp&nbsp&nbsp&nbsp")
			document.getElementById("textEditor").appendChild(newText)
			var lastLine = document.createElement("div")
			lastLine.classList.add("lineNumber")
			lastLine.innerHTML = l + 1
			document.getElementById("lineNumber").appendChild(lastLine)
		}

		setCaretPos(0, 0)
		i = undefined
		j = undefined
		_ec = undefined
	}

	document.getElementById("codeEditorTabName").innerHTML = file.name + "<span style='color: purple;'>  ~</span><span style='color: green;'>$</span>"
	
	//Free memory
}, false)