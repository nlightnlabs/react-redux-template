import React, {useState, useEffect, forwardRef, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as iconsApi from '../apis/icons';
import {formatDateInput} from '../functions/formatValue'

const MultiInput = forwardRef((props, ref) => {

  let target = {}
  const list = props.list
  const label = props.label
  const type = props.type
  const id = props.id
  const name =props.name
  const onChange= props.onChange 
  const onBlur= props.onBlur
  const onHover= props.onHover
  const [valueColor, setValueColor]= useState(props.valueColor)
  const [labelColor, setLabelColor]= useState(props.labelColor)
  const optionColor = props.optionColor
  const valueSize= props.valueSize 
  const labelSize= props.labelSize 
  const optionSize = props.optionSize
  const valueWeight=  props.valueWeight
  const labelWeight= props.labelWeight
  const optionWeight = props.optionWeight
  const layout= props.layout
  const border= props.border
  const valueFill= props.valueFill 
  const [labelFill, setLabelFill] = useState(props.labelFill)
  const padding= props.padding
  const rounded= props.rounded
  const readonly= props.readonly
  const disabled= props.disabled
  const required = props.required
  const showLookupValue = props.showLookupValue || false
  const width = props.width
  const height = props.height
  const dropDownFill = props.dropDownFill
  const allowAddData = props.allowAddData
  const marginTop = props.marginTop
  const marginBottom = props.marginBottom

  const [value, setValue] = useState("")
  const [options, setOptions] = useState([])
  const [dropDownDisplay, setDropDownDisplay] = useState("none")
  const [calendarDisplay, setCalendarDisplay] = useState("none")
  const [datePickerDisplay, setDatePickerDisplay] = useState("none")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [startDate, setStartDate] = useState(new Date());

  const [formClassList, setFormClassList] = useState("form-floating w-100")

  const inputRef = useRef("")
  const containerRef = useRef("")

  useEffect(()=>{
    if(list && list.length>0 && value !="" && value !=null){
      setSelectedIndex(list.indexOf(props.value))
    }
  },[list])

  useEffect(()=>{
  
    if(props.readonly || props.disabled){
      setValueColor("black")
      setLabelFill("white")
     }else{
      setValueColor(props.valueColor)
     }

     if(props.label && props.label !==""){
      setFormClassList("form-floating w-100")
     }else{
      setFormClassList("form-group w-100")
     }

  },[props.readonly, props.disabled, props.label])

  

  useEffect(()=>{
    setValue(props.value || "")
  },[props.value])

  const containerstyle={
    display: "flex",
    position: "relative",
    top: 0,
    left: 0,
    get display(){if(layout=="stacked"){return "block"}else{return "flex"}},
    width: "100%",
    minHeight: height,
    marginTop: marginTop || 0,
    marginBottom: marginTop || 10
  }
  

  const inputStyle ={
    fontSize: valueSize || 14,
    fontWeight: valueWeight || "normal",
    color: valueColor || "rgb(0,100,225)",
    backgroundColor: valueFill || "white",
    outline: "none",
    width: width || "100%",
    border: border|| "1px solid rgb(235,235,235)",
    get padding(){ if(padding){return padding}else{ return ;}}
  }

  const textAreaStyle ={
    cursor: "pointer",
    fontSize: valueSize || 14,
    fontWeight: valueWeight || "normal",
    color: valueColor || "#5B9BD5",
    backgroundColor: valueFill || "white",
    outline: "none",
    width: width || "100%",
    minHeight: 100,
    border: border|| "1px solid rgb(235,235,235)",
  }

  const labelStyle ={
    fontSize: labelSize || inputStyle.fontSize,
    fontWeight: labelWeight || "normal",
    color: labelColor || "gray",
  }


  const dropDownStyle = {
    display: dropDownDisplay,
    position: "absolute",
    top: (inputRef.current.offsetHeight)+"px",
    left: (inputRef.current.offsetLeft)+"px",
    width: "100%",
    maxHeight: 200,
    overflowY: "auto",
    overflowX: "hidden",
    padding: padding || 5,
    backgroundColor: dropDownFill || "rgba(255,255,255,0.95)",
    boxShadow: "5px 5px 5px lightgray",
    border: "1px solid lightgray",
    borderRadius: "0px 0px 5px 10px",
    color: valueColor || "#5B9BD5",
    zIndex:99999
  }

  const optionsStyle = {
    display: "block",
    width: "100%",
    cursor: "pointer",
    fontSize: inputStyle.fontSize,
    fontWeight: optionWeight || "normal",
    padding: padding || 5,
    color: optionColor || "black",
    backgroundColor: "white" || "rgb(255,255,255,0)",
  }


  const handleOptionClick=(e)=>{

    let selectedIndex = e.target.id
    let selectedValue = list[selectedIndex]

    setValue(selectedValue)
    setSelectedIndex(selectedIndex)
    setOptions(list)

    setDropDownDisplay("none")
    updateStates(selectedValue)
  }

  const handleOptionHover = (event)=>{
    if(event.type == "mouseover") {
      event.target.style.backgroundColor = "rgb(235,245,255)";
      event.target.style.fontWeight = "bold";
      event.target.style.color = "#2C7BFF";
    }else{
      event.target.style.backgroundColor = optionsStyle.backgroundColor;
      event.target.style.fontWeight = optionsStyle.fontWeight;
      event.target.style.color = optionsStyle.color;
    }
  }

  const handleDropDownToggle=(event)=>{
      setDropDownDisplay("block")
  }

  const updateStates=(inputValue)=>{

    let selectedValue = inputValue
    let selectedIndex = 0
    if(list && list.length>0){
      selectedIndex = list.indexOf(selectedValue)
    }
    setSelectedIndex(selectedIndex)
    updateParent(selectedValue)
  }

  const updateParent = (inputValue)=>{
    if(typeof onChange =="function"){
      let target = {
        ...props,
        value: inputValue,
      }
      onChange({target})
    }
  }
  
  const handleHover=(e)=>{
    if(e.type =="mouseleave"){
        setDropDownDisplay("none")
    }
  }

  const handleDoubleClick = (e)=>{

    props.list && props.list>0 && setOptions(props.list)
    setDropDownDisplay("block")
    e.target.select()
   
  }

  const handleFocus = (e)=>{
    if(list  && list.length>0){
      setOptions(list.filter(item=>item))
    }
    setDropDownDisplay("block")
    e.target.select()
  }

  const handleClick = (e)=>{
    
    if(list  && list.length>0){
      setOptions(list.filter(item=>item))
    }
    setDropDownDisplay("block")
  }

  const handleBlur=(e)=>{
    
  }

  const inputProps = {
    readOnly: readonly || false,
    disabled: disabled || false,
    required: required || false,
    multiple: true 
  }

  const handleInputChange=(inputText)=>{
    
      setValue(inputText)
      
      if(props.list && props.list.length>0){
        // filter the options based on the text user has inputted
        if(inputText && inputText.length>=1){
          setOptions(options.filter(item=>item.toLowerCase().includes((inputText).toLowerCase())))
        }else{
          setOptions(list.filter(item=>item))
        }
      }
      updateStates(inputText)
  }

  const addIconStyle = {
    maxHeight: 20,
    maxWidth: 20,
    cursor: "pointer"
  }

  const handleAddData = ()=>{

  }

  const formatDate = (inputValue)=>{
    var date = new Date(inputValue); 
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )) .toISOString() .split("T")[0];
    setValue(dateString || "")
  }

  const formatValue = (inputValue)=>{
    if(type == "date"){
      formatDate(inputValue)
    }else{
      setValue(inputValue || "")
    }
  }

  return (
    <div 
      ref = {containerRef}
      id={id}
      name={name} 
      className="d-flex"
      style={containerstyle}
      onBlur={(e)=>handleBlur(e)}
      onMouseLeave={(e)=>handleHover(e)}
      onClick={(e)=>handleClick(e)}
    >
          <div className={formClassList}>
          {type == "textarea" ?
              <textarea 
                className="form-control"
                id={id}
                name={name}
                style={textAreaStyle} 
                ref = {inputRef}
                type={type}
                value={value}
                onChange={(e)=>handleInputChange(e.target.value)}
                onBlur={(e)=>handleBlur(e.target.value)}
                {...inputProps}
                >
            </textarea>
            :
            type == "file" ?
              <input 
                className="form-control"
                id={id}
                name={name}
                style={textAreaStyle}
                ref = {inputRef}
                type={type}
                value={value}
                placeholder={label}
                onChange={(e)=>handleInputChange(e.target.value)}
                onBlur={(e)=>handleBlur(e.target.value)}
                {...inputProps}
                >
            </input>
            :
            <input 
                className="form-control"
                id={id}
                name={name}
                style={inputStyle}
                ref = {inputRef}
                type={type}
                placeholder={label}
                value={type=="date"? formatDateInput(value):value}
                onChange={(e)=>handleInputChange(e.target.value)}
                onBlur={(e)=>handleBlur(e)}
                onDoubleClick={(e)=>handleDoubleClick(e)}
                onFocus={(e)=>handleFocus(e)}
                {...inputProps}
                >
            </input>
            }
            {label && label!=="" && <label htmlFor={name} className="form-label text-body-tertiary small" style={labelStyle}>{label}</label>}
          </div>
        

         {list && list.length>0 && type!=="date" &&
            <div style={dropDownStyle}>
              {options.map((item,index)=>(
                <div
                  key={index}
                  id={props.list.indexOf(item)}
                  name={item}
                  style={optionsStyle}
                  onClick={(e)=>handleOptionClick(e)}
                  onMouseOver={(e)=>handleOptionHover(e)}
                  onMouseLeave={(e)=>handleOptionHover(e)}
                >
                  {item}
                </div>
              ))}
            </div>  
        }
        {
            props.list && props.list.length>0 && type=="select" && allowAddData && 
            <img 
              src={`${iconsApi.generalIcons}/add_icon.png`} 
              alt="Add Icon"
              style={addIconStyle} 
              onClick={(e)=>handleAddData(e)}>
            </img>
        }

    </div>
  )
})

export default MultiInput