//YOOOO!!! HIII!!
//Just as an intruduction;
//If you are a making a function that will move the caret,
//Make sure you use the functions:
//relativeLine(x, y)
//highlightCurrentLineNumber(x)
//and most importantly: setCaretPos(x, y) (you can go on without using others, but not this one)

//Don't regret to ask anything about the code that confused you to the creator! github.com/polandian
//(sorry, it's kinda messy <3)

let lastAction = null

//Moves the block cursor (which is called caret for a reason)
function setCaretPos(x, y){ //x = cursorX
	//Sets caret position   //y = cursorY
	document.getElementById("editorCursor").style.marginLeft = x + "px"
	document.getElementById("editorCursor").style.marginTop = y + "px"
	x = undefined
	y = undefined
}

//Highlights current line
function highlightCurrentLineNumber(x){ //x == currentLine
	if(highlightLine.value == true){
		for(var i = 0; i < document.querySelectorAll(".lineNumber").length; i++){
			document.querySelectorAll(".lineNumber")[i].style.background = "none"
		}
		/*for(var i = 0; i < document.querySelectorAll(".textEditorLine").length; i++){
			document.querySelectorAll(".textEditorLine")[i].style.background = "none"
		}
		document.querySelectorAll(".textEditorLine")[x].style.background = "rgba(255, 255, 255, 0.06)"*/
		//Secret feature! Remove the /**/ to get a special line highlighter!
		document.querySelectorAll(".lineNumber")[x].style.background = "rgb(22, 94, 240)"
	}
}

//Relative lines (Function to make it work)
function relativeLine(x, y){
	//x = currentLine
	//y = lineAmount
	//text inside that line is 1 more than our current line variable
	document.querySelectorAll(".lineNumber")[x].innerText = x + 1

	var j = 0
	var k = 0
	for(var i = x + 1; i < y + 1; i++){
		j++
		document.querySelectorAll(".lineNumber")[i].innerText = j 
	}

	for(var l = x - 1; l > -1; l--){
		k++
		document.querySelectorAll(".lineNumber")[l].innerText = k
	};
}

//Removes current line
function removeLine(x, y){
	document.querySelectorAll(".textEditorLine")[x].remove() //x=currentLine
    														 //y=lineAmount
	y--
	document.querySelectorAll(".lineNumber")[y + 1].remove() //removes last line number
	if(relativeLines.value == true){ 
		//##########################
		//#     VERY IMPORTANT     #
		//# IF YOU ARE GOING TO USE#
		//# THIS FUNCTION LATER ON #
		//# MAKE SURE YOU USE IT   #
		//# BEFORE YOU LOWER THE   #
		//# CURRENTLINE VALUE      #
		//#BECAUSE ITS LOWERED HERE#
		//##########################
		relativeLine(x - 1, y)
	}
}

//Creates a new line
function createNewLine(x, y, z, w){
	var cursorX = x
	var cursorY = y
	//if at the end of the line
	if(cursorX == document.querySelectorAll(".textEditorLine")[z].innerText.length * 9){
		w++
		z++
		cursorX = 0
		cursorY += 31
		var selectedLine = document.querySelectorAll(".textEditorLine")[z]
		var newText = document.createElement("div")
		newText.classList.add("textEditorLine")
		newText.innerText = ""
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, selectedLine)
		var lastLine = document.createElement("div")
		lastLine.classList.add("lineNumber")
		document.getElementById("lineNumber").appendChild(lastLine)
		if(relativeLines.value == false){
			lastLine.innerText = w + 1
		}
		else{
			relativeLine(z, w)
		}
	}
	//if in the middle of line
	else if(cursorX < document.querySelectorAll(".textEditorLine")[z].innerText.length * 9 && cursorX > 0){
		var textToMove = document.querySelectorAll(".textEditorLine")[z].innerText.substr(cursorX / 9, document.querySelectorAll(".textEditorLine")[z].innerText.length - cursorX / 9)
		var textToRemain = document.querySelectorAll(".textEditorLine")[z].innerText.slice(0, cursorX / 9)
		document.querySelectorAll(".textEditorLine")[z].innerText = textToRemain
		w++
		z++
		var newText = document.createElement("div")
		newText.classList.add("textEditorLine")
		newText.innerText = textToMove
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, document.querySelectorAll(".textEditorLine")[z - 1].nextSibling)
		cursorX = 0
		cursorY += 31

		var lastLine = document.createElement("div")
		lastLine.classList.add("lineNumber")
		document.getElementById("lineNumber").appendChild(lastLine)
		if(relativeLines.value == false){
			lastLine.innerText = w + 1
		}
		else{
			relativeLine(z, w)
		}
	}
	//if at the beginning of the line
	else if(cursorX == 0){
		w++
		cursorY += 31
		var selectedLine = document.querySelectorAll(".textEditorLine")[z]
		var newText = document.createElement("div")
		newText.classList.add("textEditorLine")
		newText.innerText = ""
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, selectedLine)
		z++
		var lastLine = document.createElement("div")
		lastLine.classList.add("lineNumber")
		document.getElementById("lineNumber").appendChild(lastLine)
		if(relativeLines.value == false){
			lastLine.innerText = w + 1
		}
		else{
			relativeLine(z, w)
		}
	}
	highlightCurrentLineNumber(z)
	setCaretPos(cursorX, cursorY)
	cursorX = undefined
	cursorY = undefined
}

//Keyboard handler
document.addEventListener('keydown', function(event){
	var cursorX = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginLeft)
	var cursorY = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginTop)
	var lineAmount = document.getElementById("lineNumber").childElementCount - 1
	var currentLine = cursorY / 31

	//TODO LAST ACTION
	//BTW  JAVASCRIPT DOESN'T SEE THE SPANS AS OTHER ELEMENTS, SO ITS GONNA BE PRETTY EZZ!!! IM SO HAPPY OMG
	//TODO ALSO THIS LOOKS PRETTY COOL FOR LINES WITH ERRORS: document.querySelectorAll(".lineNumber")[x].style.background = "rgb(245, 15, 84)";
	//TODO MAKE OWN SCROLLBAR 'CAUSE WHY NOT
	//TODO SCROLL ON OVERFLOW
	//TODO ALSO CHECK OUT split() FOR SYNTAX HIGHLIGHTHING
	//TODO WRITE

	if(cursorBlink.value == true){
		//For cursor blink animation, make cursor visible when a key is pressed
		clearTimeout(sTO) 
		document.getElementById("editorCursor").classList.remove("editorCursorAnim")
		document.getElementById("editorCursor").style.opacity = 1
		var sTO = setTimeout(() => {
			document.getElementById("editorCursor").classList.add("editorCursorAnim")
		}, 100)
	}

	//char before cursor
	var charToRemoveBackspace = (document.querySelectorAll(".textEditorLine")[currentLine].innerText).charAt((cursorX/9) - 1)
	var charToRemoveBackspaceIndex = cursorX / 9 - 1

	var charToRemoveDel = (document.querySelectorAll(".textEditorLine")[currentLine].innerText).charAt((cursorX/9))
	var charToRemoveDelIndex = cursorX / 9
	//char after  cursor

	//one keypress handler
	if(!event.ctrlKey){
		switch(event.keyCode){
			case 13: //Enter
				//Creates new Line
				createNewLine(cursorX, cursorY, currentLine, lineAmount)
				break
			case 37: //Left Arrow Key
				if(cursorX > 0) cursorX-=9
				else if(cursorX == 0 && currentLine > 0){
					currentLine--
					cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					cursorY -= 31
					highlightCurrentLineNumber(currentLine)
					if(relativeLines.value == true) relativeLine(currentLine, lineAmount)
				}
				setCaretPos(cursorX, cursorY)
				break
			case 39: //Right Arrow Key
				if(cursorX < document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9) cursorX+=9
				else if(cursorX == document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9 && currentLine != lineAmount){
					currentLine++
					cursorX = 0
					cursorY += 31
					highlightCurrentLineNumber(currentLine)
					if(relativeLines.value == true) relativeLine(currentLine, lineAmount)
				}
				setCaretPos(cursorX, cursorY)
				break
			case 38: //Up Arrow Key
				if(currentLine > 0){
					currentLine-= 1
					cursorY-= 31 //cursorY
					if(relativeLines.value == true){
						relativeLine(currentLine, lineAmount)
					}
					try{
						if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9){
							cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
						}
					}catch(error){
						console.log("Caught Error: "+error)
						cursorX = 0
					}
					highlightCurrentLineNumber(currentLine)
					setCaretPos(cursorX, cursorY)
				}
				break
			case 40: //Down Arrow Key
				if(currentLine < lineAmount){
					currentLine+= 1
					cursorY+= 31 //cursorY
					highlightCurrentLineNumber(currentLine)
					if(relativeLines.value == true){
						relativeLine(currentLine, lineAmount)
					}
					try{ //gets current line, compares it to the before line
						if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9){
							cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
						}
					}catch(error){ //if new line has no text, set cursor left pos to 0
						console.log("Caught Error: "+error)
						cursorX = 0 
					}
					setCaretPos(cursorX, cursorY)
				}
				break
			case 8: //Backspace
				if(charToRemoveBackspace == ""){
					removeLine(currentLine, lineAmount)
					if(cursorY > 1)	(cursorY-= 31,  currentLine--)
					cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					highlightCurrentLineNumber(currentLine)
					setCaretPos(cursorX, cursorY)
				}
				else if(charToRemoveBackspace != ""){
					var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText.slice(0, charToRemoveBackspaceIndex) + document.querySelectorAll(".textEditorLine")[currentLine].innerText.slice(charToRemoveBackspaceIndex + 1)
					document.querySelectorAll(".textEditorLine")[currentLine].innerText = temp
					cursorX-=9
					setCaretPos(cursorX, cursorY)
				}
				break
			case 46: //Del
				if(charToRemoveDel == "" && currentLine != lineAmount){
					currentLine++
					document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText + document.querySelectorAll(".textEditorLine")[currentLine].innerText
					removeLine(currentLine, lineAmount)
					currentLine--
					cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					highlightCurrentLineNumber(currentLine)
					setCaretPos(cursorX, cursorY)
				}
				else if(charToRemoveDel != ""){
					var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText.slice(0, charToRemoveDelIndex) + document.querySelectorAll(".textEditorLine")[currentLine].innerText.slice(charToRemoveDelIndex + 1) //increase the 1 to delete more characters
					document.querySelectorAll(".textEditorLine")[currentLine].innerText = temp
				}
				break
			case 36: //Home
				cursorX = 0
				setCaretPos(cursorX, cursorY)
				break 
			case 35: //End
				cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
				setCaretPos(cursorX, cursorY)
				break
		}
	}
	

	//CtrlShiftK
	if(event.ctrlKey && event.shiftKey && event.keyCode == 75){
		if(lineAmount >= 1){
			removeLine(currentLine, lineAmount)
			if(cursorY > 1)	(cursorY-= 31,  currentLine--)
			cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
			highlightCurrentLineNumber(currentLine)
			setCaretPos(cursorX, cursorY)			
		}
		else{
			document.querySelectorAll(".textEditorLine")[currentLine].innerText = " "	
			cursorX = 0
			setCaretPos(cursorX, cursorY)
		}
	}

	//CtrlA
	else if(event.ctrlKey && event.keyCode == 65){
		//TODO SELECT ENTIRE LINE
		alert("CTRLA")
	}

	//CtrlArrowKey
	var CtrlMoveKeys = [37, 39, 8, 46]
	var specialCharacter = ["!", "*", ";", ":", ",", ".", "'", '"', " ", "(", ")", "{", "}", "[", "]"] 
	//leftArrow, upArrow, downArrow, rightArrow, backspace, del

	if(event.ctrlKey && CtrlMoveKeys.includes(event.keyCode)){
		switch(event.keyCode){
			case 37: //left key
				var i = (cursorX / 9) - 1
				while(!specialCharacter.includes(document.querySelectorAll(".textEditorLine")[currentLine].innerText.charAt(i)) && i * 9 != 0){
					i--
				}
				cursorX = i * 9
				setCaretPos(cursorX, cursorY)
				i = undefined
				break
			case 39: //right key
				if(cursorX / 9 != document.querySelectorAll(".textEditorLine")[currentLine].innerText.length){
					var i = (cursorX / 9) + 1
					while(!specialCharacter.includes(document.querySelectorAll(".textEditorLine")[currentLine].innerText.charAt(i)) && i + 1 < document.querySelectorAll(".textEditorLine")[currentLine].innerText.length){
						i++
					}
					if((i + 1) <= document.querySelectorAll(".textEditorLine")[currentLine].innerText.length) cursorX = (i + 1) * 9
					else cursorX = i * 9
					setCaretPos(cursorX, cursorY)
					i = undefined						
				}
				break
			case 8: //backspace
				if(charToRemoveBackspace != ""){
					var i = (cursorX / 9) - 1
					var j = 0
					if(specialCharacter.includes(document.querySelectorAll(".textEditorLine")[currentLine].innerText.charAt(i))){
						i = i - 1
					}
					while(!specialCharacter.includes(document.querySelectorAll(".textEditorLine")[currentLine].innerText.charAt(i)) && i * 9 != 0){
						i--
						j++
					}
					i++
					cursorX = i * 9
					var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText.substr(0, i) + document.querySelectorAll(".textEditorLine")[currentLine].innerText.substr(i + j)
					document.querySelectorAll(".textEditorLine")[currentLine].innerText = temp
					setCaretPos(cursorX, cursorY)
					i = undefined
					j = undefined
				}
				break
			case 46://del
				if(charToRemoveDel != ""){
					var i = (cursorX / 9) + 1
					var j = 0
					var k = i - 1
					while(!specialCharacter.includes(document.querySelectorAll(".textEditorLine")[currentLine].innerText.charAt(i)) && i < document.querySelectorAll(".textEditorLine")[currentLine].innerText.length){
						i++
						j++
					}
					var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText.substr(0, k) + document.querySelectorAll(".textEditorLine")[currentLine].innerText.substr(i)
					document.querySelectorAll(".textEditorLine")[currentLine].innerText = temp
					i = undefined
					j = undefined
					k = undefined
				}
				break
		}
	}

	//Free memory
	cursorX = undefined
	cursorY = undefined
	lineAmount = undefined
	currentLine = undefined
	charToRemoveBackspace = undefined
	charToRemoveBackspaceIndex = undefined
	charToRemoveDel = undefined
	charToRemoveDelIndex = undefined
	CtrlMoveKeys = undefined
	specialCharacter = undefined	
}, false);

$(function(){ //gets the scroll position of codeEditor 
    $('#codeEditor').on("mousewheel", function() {
        console.log($("#codeEditor").scrollTop());
    });
});
