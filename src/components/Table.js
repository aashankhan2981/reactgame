import React, { useState,useEffect } from "react";
export const Table = () => {
  let val = []
  let row1 = 1
  let check = []
  if(localStorage.getItem("values")){
    val = (JSON.parse(localStorage.getItem("values")))
 }
 if(localStorage.getItem("row")){
   row1 = (JSON.parse(localStorage.getItem("row")))
 }
 if(localStorage.getItem("check")){
   check = JSON.parse(localStorage.getItem('check'))
 }
  const [values, setValue] = useState(val);
  const [row, setRow] = useState(row1);
  const [arr, setarr] = useState([]);
  const [checkloop,checkset] = useState(check)

  useEffect(() => {
    localStorage.setItem("values",JSON.stringify(values))
    localStorage.setItem("row",JSON.stringify(row))
    
  }, [values])
    
  
    const generating = (e) => {
    e.preventDefault();
    const value = e.target.input.value;
    // e.target.input.value=''
    setRow(value);
    let loop = [];
    let loop2 = []
    let num = ''
    for (let i = 0;true; i++) {
         if(i<(value*value)){
           loop2.push(i+1)
         }
         num = Math.floor((Math.random() * (value*value)) + 1)
        if(loop.length===(value*value)){
          break
        }
        else if(!(loop.includes(num))){
            loop.push(num)
        }

    }
    checkset(loop2)
    localStorage.setItem("check",JSON.stringify(loop2))
    setValue(loop);

  };
  
  const Exchanger = (e)=>{
    
    let id = Number(e.target.id)
    arr[0] = id
  }
  const dragging = (e)=>{
    e.preventDefault()
    
  }
  const drop = (e)=>{
    let id2= Number(e.target.id)
    arr[1] = id2
    setarr(arr)
    let newvalue = values.map((value,index)=>{
      if(value == arr[0]){
       return values[values.indexOf(value)] =arr[1]
      }
      else if(value==arr[1]){
       return values[values.indexOf(value)] =arr[0]
  
      }
      else{
        return value
      }
    })
    console.log(checkloop)
    console.log(newvalue)
    setValue(newvalue)
    let count = 0
    newvalue.forEach((element,index) => {
      if(checkloop[index] === element){
          count++
      }
    });
    if(count===newvalue.length){
      setarr(false)
      console.log("DONE")
    }

    

    
  }
  

  return (
    <div>
      <div className="flex justify-center items-center bg-red-300 h-12">
        <form
          action=""
          onSubmit={(e) => {
            generating(e);
          }}
        >
          <input
            type="number"
            name="input"
            placeholder="Enter a number"
            className="outline-none h-8 "
          />
          <button
            type="submit"
            className="bg-green-800 h-8 w-20 ml-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
      {arr?<div className={`grid grid-cols-${row} grid-rows-${row}`} id="container">
        {values.map((value, index) => {
          return (
            <div
              className="bg-red-300 h-20 w-20 mx-auto my-5 text-center flex items-center justify-center text-white text-lg"
              id={value}
              draggable
              onDragStart={(e) =>{Exchanger(e)}}
              onDragOver={(e)=> {dragging(e)}}
              onDrop={(e)=>{drop(e)}}
              key={index}
            >
              {value}
            </div>
          );
        })}
      </div>: <div className="bg-red-300 shadow-2xl text-white text-2xl border mx-64 my-20 h-72 flex flex-col items-center justify-center " >Congratulations! You have done it.
      <button className="bg-white text-black text-xl w-28 mt-6 hover:bg-black hover:text-white" onClick={()=>{
        
        setarr([])
      }} >Ok</button>
      </div> }
    </div>
  );
};
