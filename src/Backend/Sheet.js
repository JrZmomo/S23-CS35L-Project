function mod(n, m) {
  return ((n % m) + m) % m;
}
//object handling a singular note. Note that a single note
//can also be a chord
class Note
{
//pos must be an array of int, dur is a string, 
//acc is accidentals, force is anything like accents

  	constructor(pos=[0], dur="q", acc=null, force=null,rest=false)
    {
    	var collection=[]
      for(let i=0; i<pos.length; i++)
      {
        let n="";
      	switch(mod(pos[i],7))
        {
        	case 0:
          	n+="b"
            break;
        case 1:
          	n+="c"
            break;
		    case 2:
          	n+="d"
            break;
        case 3:
          	n+="e"
            break;
        case 4:
          	n+="f"
            break;
        case 5:
          	n+="g"
            break;
        case 6:
          	n+="a"
            break;
        }
        n+="/";
        let num=Math.floor(pos[i]/7)+5;
        if(n=="b/")
        	num-=1;
        n+=num.toString();
        collection.push(n);
      }
      var duration=0
      for(let i=0; i<dur.length; i++)
      {
      	if(dur[i]=="q")
        	duration=4;
         else if(dur[i]=="w")
         	duration=1;
         else if(duration==0&&dur[i]=="h")
         	duration=2;
         else if(dur[i]=="h")
         	duration*=2;
      }
      if(rest)
      	duration=duration.toString()+"r";
    	this.note=new Vex.Flow.StaveNote({ keys: collection, duration: duration });
    }
    getNote()
    {
    	return this.note;
    }
}
class Sheet 
{
	
	constructor(clefnum=1, font="Times New Roman")
  {
  	this.SHEET_WIDTH=1220;
    
  	canvas = $("#score")[0];
    this.renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
    this.ctx = renderer.getContext();
  	this.measures = [];
    this.noteset = [];
    for(let i = 0; i < clefnum; i++) 
    {
      this.measures.push([]);
      this.noteset.push([]);
    }
  }
  render()
  {
  	for(let i = 0; i < clefnum; i++) 
    {
    	for(let j=0; j<this.measures.length; j++)
      {
      	Vex.Flow.Formatter.FormatAndDraw(this.ctx, this.measures[i][j],this.noteset[i][j]);
      }
    }
  }
  
  //Detecting and determining the position of a new measure
  newMeasure(cleffnum,len=300,b=null)
  {
  	var staveMeasure;
  	if(this.measures[cleffnum].length==0)
    {
    	staveMeasure = new Vex.Flow.Stave(10, 0, len);
    }
    else
    {
    	if(this.measures[cleffnum][this.measures[cleffnum].length-1].x>this.SHEET_WIDTH-len)
    	staveMeasure = new Vex.Flow.Stave(10, this.measures[cleffnum][this.measures[cleffnum].length-1].y+100*cleffnum, len);
    }
    this.measures[cleffnum].push(staveMeasure);
  }
  //takes in the cleffnum, and an array of Note objects
	newNoteSet(cleffnum,notes)
  {
  	var notemeasure=[];
  	for(let i=0; i<notes.length; i++)
    {
    	notemeasure.push(notes[i].getNote())
    }
    this.noteset[cleffnum].push(notemeasure);
  }
}
