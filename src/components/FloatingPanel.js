import React, {useRef, useState, useEffect} from "react"
import { toProperCase } from "./functions/formatValue";
import * as iconsApi from './apis/icons.js'

const FloatingPanel = (props) => {
    const { children, title, height, width, displayPanel} = props;
    const [appIcons, setAppIcons] = useState([])

    const panelRef = React.useRef();
    const allowDrag = true

    const [position, setPosition] = React.useState({ x: 0.5*window.innerWidth, y: 0.5*window.innerHeight });
    const [isDragging, setIsDragging] = React.useState(false);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });

   
    const containerStyle = {
      position: "fixed",
      height: height,
      width: width,
      maxHeight: "80vh",
      maxWidth: "60vw",
      transform: "translate(-50%, -50%)",
      cursor: "move",
      zIndex: 99999,
      overflow: "hidden"
    };
  
    const handleMouseDown = (e) => {
      if (!allowDrag) return;
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    };

    const handleMouseUp = (e) => {
        setIsDragging(false)
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging || !allowDrag) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    };

    const HeaderStyle={
      backgroundColor:"rgb(235,235,235)", 
      height:"50px", 
      overflow:"hidden",
      borderBottom: "2px solid gray"
    }

    const TitleStyle = {
      fontSize:"25px", 
      color: "black", 
      fontWeight: "bold",
    }

    const BodyStyle = {
        height: "95%", 
        width: "100%", 
        overflowY:"auto", 
        overflowX: "hidden",
    }
    
    

    const iconButtonStyle = {
      height: "30px",
      width: "30px",
      cursor: "pointer"
    }

  
    return (
      <div
        ref={panelRef}
        className="d-flex flex-column bg-white shadow border border-3 rounded-3"
        style={{
          ...containerStyle,
          left: position.x + "px",
          top: position.y + "px",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleMouseUp}
      >
        <div className="d-flex justify-content-between align-items-center" style={HeaderStyle}>
          
          <div className="d-flex ms-1 align-items-center" style={TitleStyle}>
            {title && toProperCase(title.replaceAll("_"," "))}
          </div>

          <div className="d-flex align-items-center">
            <img src={`${iconsApi.generalIcons}/close_icon.png`} style={iconButtonStyle} onClick={(e)=>displayPanel(false)}/>
          </div>

        </div>

        <div className="d-flex flex-wrap p-3" style={BodyStyle}>
          {children}
        </div>
        
      </div>
    );
  };

  export default FloatingPanel