import React, { useReducer,useEffect, useRef } from "react";
export const Table = () => {
  let val = []
  let row1 = 1
  let check = []
  const reference = useRef(null)

  if(localStorage.getItem("values")){
    val = (JSON.parse(localStorage.getItem("values")))
 }
 if(localStorage.getItem("row")){
   row1 = (JSON.parse(localStorage.getItem("row")))

 }
 if(localStorage.getItem("check")){
   check = JSON.parse(localStorage.getItem('check'))
 }
 const reducer = (state,action)=>{
  switch (action.type) {
    case "setValue":
      return{values:action.values,row:state.row,arr:state.arr,checkloop:state.checkloop}
    case "setRow":
      return{values:state.values,row:action.row,arr:state.arr,checkloop:state.checkloop}
    case "setarr":
      return{values:state.values,row:state.row,arr:action.arr,checkloop:state.checkloop}
    case "checkset":
      return{values:state.values,row:state.row,arr:state.arr,checkloop:action.checkloop}
      
    
  
    default:
      return state
  }

}
  const [state,dispatch]=useReducer(reducer,{values:val,row:row1,arr:[],checkloop:check})
  useEffect(() => {

    localStorage.setItem("values",JSON.stringify(state.values))
    localStorage.setItem("row",JSON.stringify(state.row))
  }, [state.values,state.row])
    
    

    const generating = (e) => {
    e.preventDefault();
    const value = e.target.input.value;
    
    dispatch({type:"setRow",row:value})
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
    dispatch({type:"checkset",checkloop:loop2})
    localStorage.setItem("check",JSON.stringify(loop2))
    dispatch({type:"setValue",values:loop})

  };
  
  const Exchanger = (e)=>{
    
    let id = Number(e.target.id)
    state.arr[0] = id
  }
  const dragging = (e)=>{
    
    e.preventDefault()
    
  }
  const drop = (e)=>{
    let id2= Number(e.target.id)
    state.arr[1] = id2
    dispatch({type:"setarr",arr:state.arr})
    let newvalue = state.values.map((value,index)=>{
      if(value == state.arr[0]){
       return state.values[state.values.indexOf(value)] =state.arr[1]
      }
      else if(value==state.arr[1]){
       return state.values[state.values.indexOf(value)] =state.arr[0]
  
      }
      else{
        return value
      }
    })
    dispatch({type:"setValue",values:newvalue})
    let count = 0
    newvalue.forEach((element,index) => {
      if(state.checkloop[index] === element){
          count++

      }
    });
    if(count===state.values.length){

      dispatch({type:"setarr",arr:false})
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
            className="outline-none h-8 w-40 "
             min={2} max={8}
             ref={reference}
             placeholder={state.row}
             
          />
          <button
            type="submit"
            className="bg-green-800 h-8 w-20 ml-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
      {state.arr?<div className={`grid grid-cols-${state.row} grid-rows-${state.row}`} id="container">
        {state.values.map((value, index) => { 
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
        
        reference.current.focus()
        
        dispatch({type:"setarr",arr:[]})
      }} >Ok</button>
      </div> }
    </div>
  );
};
