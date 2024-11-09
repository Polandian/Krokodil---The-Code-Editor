let lastAction = null


function setCaretPos(x, y){ //x = cursorX
	//Sets caret position   //y = cursorY
	document.getElementById("editorCursor").style.marginLeft = x + "px"
	document.getElementById("editorCursor").style.marginTop = y + "px"
	x = undefined
	y = undefined
}

function relativeLine(){
	/*for(var i = currentLine; i < lineAmount; i++){
		document.querySelectorAll(".lineNumber")[i - 1].innerText = i
	}
	for(var i = currentLine; i > 0; i--){
		document.querySelectorAll(".lineNumber")[i - 1].innerText = i
	}*/
}

function removeLine(x, y){
	document.querySelectorAll(".textEditorLine")[x].remove() //x=currentLine
	document.querySelectorAll(".lineNumber")[x].remove()     //y=lineAmount
	y--
	if(relativeLines.value == false){
		for(var i = 1; i < y + 2; i++){
				document.querySelectorAll(".lineNumber")[i - 1].innerText = i
			}
	}else{
		relativeLine()
	}
}

function createNewLine(x, y, z, w){
	var cursorX = x
	var cursorY = y
	if(z == w){
		w++ //lineNumber
		z++ //currentLine
		var newLine = document.createElement("div")
		var newText = document.createElement("div")
		newLine.classList.add("lineNumber")
		newText.classList.add("textEditorLine")
		if(relativeLines.value == false){
			newLine.innerHTML = w + 1
		}
		else{
			relativeLine()
		}
		newText.innerText = ":"
		document.getElementById("lineNumber").appendChild(newLine)
		document.getElementById("textEditor").appendChild(newText)
		cursorY+= 31
		cursorX = 9
	}
	else if(z != w && cursorX == document.querySelectorAll(".textEditorLine")[z].innerText.length * 9){
		w++
		z++
		cursorX = 9
		cursorY += 31
		var selectedLine = document.querySelectorAll(".textEditorLine")[z]
		var newLine = document.createElement("div")
		var newText = document.createElement("div")
		newLine.classList.add("lineNumber")
		newText.classList.add("textEditorLine")
		newText.innerText = ":"
		document.getElementById("lineNumber").appendChild(newLine)
		if(relativeLines.value == false){
			for(var i = 1; i < w + 2; i++){
				document.querySelectorAll(".lineNumber")[i - 1].innerText = i
			}
		}
		else{
			relativeLine()
		}
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, selectedLine)
	}
	else if(z != w && cursorX < document.querySelectorAll(".textEditorLine")[z].innerText.length * 9){
		//TODO DO THIS
	}
	setCaretPos(cursorX, cursorY)
	cursorX = undefined
	cursorY = undefined
}

document.addEventListener('keydown', function(event){
	var cursorX = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginLeft)
	var cursorY = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginTop)
	var lineAmount = document.getElementById("lineNumber").childElementCount - 1
	var currentLine = cursorY / 31

	//TODO MAKE REMOVE
	//BACKSPACE and DEL BUTTON
	//IMO YOU CAN GET THE CURRENT LINE
	//THEN GET THE CURRENT LETTER
	//BY DIVIDING cursorX
	//AND REMOVING 1 TO GET THE LETTER BEFORE THE CURSOR
	//THIS IS EXACTLY WHAT I DID

	//TODO DO OWN SCROLLBAR FOR OVERFLOWS
	//TODO MAKE SELECT ENTIRE LINE WITH CTRL A + CHANGE BACKGROUND OF THAT LINE
	//I WISH WE DIDN'T HAVE EXAMS BRO IT TAKES SO LONG TO FINISH
	//TODO OH AND ALSO FIX relativeLine()
	//ITS GETTING CALLED YOU JUST NEED TO MAKE IT WORK
	//ALSO YOU MIGHT NEED TO DO YOUR OWN KEYHOLD SYSTEM
	//BUT UR PROBABLY TOO LAZY FOR THAT AS EVEN CREATORS OF THE COMPUTERS DIDN'T IMPLEMENT IT
	//TODO ALSO DO LAST ACTION
	//TODO ALSO DO IT SO THAT IF YOU PRESS ENTER IN THE MIDDLE (OR ANYWHERE THAT ISN'T THE CORNER) OF THE LINE, BREAK THE LINE 
	//                                                                                          BUT DONT REMOVE IT OR ANYTHING
	//                                                                                              JUST GET EVERYTHING IN THE 
	//															  								       RIGHT OF THE CURSOR AND 
	//																					  CREATE NEW LINE, THEN PASTE IT THERE
	//ALSO EDITOR WRAPPER HAS THE HEIGHT OF 361

	//char before cursor
	var charToRemoveBackspace = (document.querySelectorAll(".textEditorLine")[currentLine].innerText).charAt((cursorX/9) - 1)
	var charToRemoveDel = (document.querySelectorAll(".textEditorLine")[currentLine].innerText).charAt((cursorX/9))
	//char after cursor

	switch(event.keyCode){
		case 13: //Enter
			//Creates new Line
			createNewLine(cursorX, cursorY, currentLine, lineAmount)
			break
		case 37: //Left Arrow Key
			if(cursorX > 0) cursorX-=9
			setCaretPos(cursorX, cursorY)
			break
		case 39: //Right Arrow Key
			if(cursorX < document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9) cursorX+=9
			setCaretPos(cursorX, cursorY)
			break
		case 38: //Up Arrow Key
			if(currentLine > 0){
				currentLine-= 1
				cursorY-= 31 //cursorY
				try{
					if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9){
						cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					}
				}catch(error){
					console.log("Caught Error: "+error)
					cursorX = 0
				}
				if(relativeLines.value == true){
					relativeLine()
				}
				setCaretPos(cursorX, cursorY)
			}
			break
		case 40: //Down Arrow Key
			if(currentLine < lineAmount){
				currentLine+= 1
				cursorY+= 31 //cursorY
				try{ //gets current line, compares it to the before line
					if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9){
						cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					}
				}catch(error){ //if new line has no text, set cursor left pos to 0
					console.log("Caught Error: "+error)
					cursorX = 0 
				}
				if(relativeLines.value == true){
					relativeLine()
				}
				setCaretPos(cursorX, cursorY)
			}
			break
		case 8: //Backspace
			console.log(charToRemoveBackspace)
			if(charToRemoveBackspace == ""){
				removeLine(currentLine, lineAmount)
				if(cursorY > 1)	(cursorY-= 31,  currentLine--) 
				setCaretPos(cursorX, cursorY)
			}
			break
		case 46: //Del
			console.log(charToRemoveDel)
			if(charToRemoveDel == "" && currentLine != lineAmount){
				currentLine++
				document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText + document.querySelectorAll(".textEditorLine")[currentLine].innerText
				removeLine(currentLine, lineAmount)
				currentLine--
				cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
				setCaretPos(cursorX, cursorY)
			}
			break
	}

	//CtrlShiftK
	if(event.ctrlKey && event.shiftKey && event.keyCode == 75){
		removeLine(currentLine, lineAmount)
		cursorX = 0
		if(cursorY > 1) (cursorY-= 31,  currentLine--, cursorX = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9)
		setCaretPos(cursorX, cursorY)
	}

	cursorX = undefined
	cursorY = undefined
	lineAmount = undefined
	currentLine = undefined
	charToRemoveBackspace = undefined
	charToRemoveDel = undefined
}, false);
