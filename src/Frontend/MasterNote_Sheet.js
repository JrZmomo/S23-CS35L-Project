//object handling a singular note. Note that a single note
//can also be a chord
class Note
{
//pos must be an array of int, dur is a string, 
//acc is accidentals, force is anything like accents

  	constructor(pos, dur, acc=null, force=null)
    {
    	var collection=[]
      for(let i=0; i<pos.length; i++)
      {
        let n="";
      	switch(pos%7)
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
        let num=Math.floor(pos/7)+5;
        if(n=="b/")
        	num-=1;
        n+=num.toString();
        collection.push(n);
      }
    	this.note=new Vex.Flow.StaveNote({ keys: collection, duration: dur });
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
    for(let i = 0; i < num; i++) 
    {
      this.measures.push([]);
      this.noteset.push([]);
    }
  }
  
  //Detecting and determining the position of a new measure
  newMeasure(cleffnum,len=300,b=null)
  {
  	if(this.measures[cleffnum].length==0)
    {
    	var staveMeasure = new Vex.Flow.Stave(10, 0, len);
    }
    else
    {
    	if(this.measures[cleffnum][this.measures[cleffnum].length-1].x>this.SHEET_WIDTH-len)
    	var staveMeasure = new Vex.Flow.Stave(10, this.measures[cleffnum][this.measures[cleffnum].length-1].y+100*cleffnum, len);
    }
  }
  newNoteSet(cleffnum,notelist)
  {
  	
  }
}