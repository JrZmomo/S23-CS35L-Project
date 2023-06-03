const textarea = document.getElementById("InputText");
const btn = document.getElementsByTagName('input')[0];
btn.addEventListener('click', translateText);

function translateText() {

    var canvas = document.querySelector('#my-canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var textValue = textarea.value;
    var textarray = textValue.split("\n");
    console.log(textarray);
    var hope;


    for (let i=0; i<textarray.length; i++){
        var line = textarray[i];
        var key = getkey(line);
        console.log(key);

        if (line.includes("clefnum")){
            console.log("Go - key_clefnum(line)");
            hope = key_clefnum(line);
        }
        if (line.includes("measure")){
            console.log("Go - key_measure(line,hope)");
            key_measure(line,hope);
        }

    }




    hope.render();
    }




//function Return : get all key in this line
function getkey(line) {
    var keys = [];
  var temp = "";
  var is_start = false;
    for (let i=0 ;i < line.length; i++){
  
  if (line.charAt(i) === '{'){
        is_start = false;
      keys.push(temp);
      temp = "";
    }
    
    if (is_start) {
        temp = temp + line.charAt(i);
    }
    if (line.charAt(i) === '\\'){
        is_start = true;
    }
  }
  console.log("Do - "+"getkey - get:"+keys);
  return keys;
}

//User Input: \clefnum{clefnum}
//function Return : new Sheet object
function key_clefnum(line) {
  var userInput = line;

  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);
  console.log("Do - "+"new Sheet("+extractedText+")");
  return new Sheet(extractedText);
}

//User Input: \note{[n1,n2,...],s,rest}
//function Rerurn: new Note object
function key_note(line) {
  var userInput = line;

  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);

  if (userInput.includes('[') && userInput.includes(']')) {
    var startIndex_num = userInput.indexOf("[") + 1;
    var endIndex_num = userInput.lastIndexOf("]");
    var extractedText_num = userInput.substring(startIndex_num, endIndex_num)
    var extractedArray_num = extractedText_num.split(",").map(item => {
      var parsedNumber = parseInt(item);
      if (!isNaN(parsedNumber)) {
        return parsedNumber;
      }
    });
    var extractedText_other = userInput.substring(endIndex_num + 1 + 1, endIndex);
    var extractedArray_other = extractedText_other.split(",").map(item => item.trim());
    var extractedArray = [extractedArray_num, ...extractedArray_other];
  } else {
    var extractedArray = extractedText.split(",").map(item => item.trim());
    var fir = [];
    fir.push(parseInt(extractedArray[0]));
    extractedArray[0] = fir;
  }

  switch (extractedArray.length) {
    case 0:
      console.log("Error : wrong input as Note");
      return;
    case 1:
        console.log("Do - "+"new Note("+extractedArray[0]+")");
      return (new Note(extractedArray[0]));
    case 2:
        console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+")");
      return (new Note(extractedArray[0], extractedArray[1]));
    case 3:
        console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+","+JSON.parse(extractedArray[2])+")");
      return (new Note(extractedArray[0], extractedArray[1], JSON.parse(extractedArray[2])));
    case 4:
        console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+","+JSON.parse(extractedArray[2])+","+JSON.parse(extractedArray[3])+")");
      return (new Note(extractedArray[0], extractedArray[1], JSON.parse(extractedArray[2]), JSON.parse(extractedArray[3])));
    case 5:
        console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+","+JSON.parse(extractedArray[2])+","+JSON.parse(extractedArray[3])+","+extractedArray[4]+")");
      return (new Note(extractedArray[0], extractedArray[1], JSON.parse(extractedArray[2]), JSON.parse(extractedArray[3]), extractedArray[4]));
  }
}




function key_measure(line,hope) {
  var userInput = line;

  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);
  var extractedArray_new = [];
    var extractedArray_note = [];
  
  
  if (extractedText.includes('\\')) {
    var endIndex_new = extractedText.indexOf("\\") - 1;
    var extractedText_new = extractedText.substring(0, endIndex_new);
    extractedArray_new = extractedText_new.split(",");
    var extractedText_note = extractedText.substring(endIndex_new + 1, extractedText.length);
    extractedArray_note = extractedText_note.split(",\\");
    if (extractedArray_note.length > 1) {
      for (let i = 1; i < extractedArray_note.length; i++) {
        extractedArray_note[i] = "\\" + extractedArray_note[i];
      }
    }
  }
  else {
    extractedArray_new = extractedText.split(",");
  }
  var cleffnum=0;
  var len=300;
  var clef=null;
  var keysig=null;
  var timesig=null;
  
  for (let i = 0; i < extractedArray_new.length; i ++){
    if (extractedArray_new[i].includes("cleffnum=")) {
        var cleffnum_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=")+1, extractedArray_new[i].length);
      cleffnum = parseInt(cleffnum_temp);
    }
    if (extractedArray_new[i].includes("clef=")) {
        var clef_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=")+1, extractedArray_new[i].length);
      clef = clef_temp;
    }
    if (extractedArray_new[i].includes("keysig=")) {
        var keysig_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=")+1, extractedArray_new[i].length);
      keysig = keysig_temp;
    }
    if (extractedArray_new[i].includes("timesig=")) {
        var timesig_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=")+1, extractedArray_new[i].length);
      timesig = timesig_temp;
    }
    if (extractedArray_new[i].includes("len=")) {
        var len_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=")+1, extractedArray_new[i].length);
      len = parseInt(len_temp);
    }
  }
  if (extractedArray_new.length !== 0){
    console.log("Do - "+"hope.newMeasure("+cleffnum+","+len+","+clef+","+keysig+","+timesig+")");
    hope.newMeasure(cleffnum,len,clef,keysig,timesig);
    
  }
  if (extractedArray_note.length !== 0){
    var note_array = [];
    for (let i = 0; i < extractedArray_note.length; i++) {
        note_array.push(key_note(extractedArray_note[i]));
    }
    console.log("Do - "+"hope.newNoteSet("+cleffnum+","+note_array+")");
    hope.newNoteSet(cleffnum,note_array);
  }
  
}


function key_marking (line) {


}


