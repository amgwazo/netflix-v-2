import React, { useState } from "react";

const Accordion = ({header, detail}) => {

    console.log(header + " " + detail);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

   const iconStyle = {
     float: "right",
     transform: isOpen ? "rotate(135deg)" : "rotate(0)",
     transition: "transform 0.5s ease",
     fontSize: "35px",
   };

    const detailsStyle = {
      backgroundColor: "#303030",
      marginTop: isOpen ? "3px" : 0,
      padding: isOpen ? "15px" : 0,
      maxHeight: isOpen ? "auto" : "0",
      overflow: "hidden",
      transition: "max-height 3s ease",
    };

  return (
    <>
      {header !== '' && detail !== '' ? (
        <>
          <div style={{ width: "90%", margin: "auto", color: "white", marginTop: "5px", fontSize: "25px" }}>
            <div
              onClick={toggleAccordion}
              style={{
                cursor: "pointer",
                backgroundColor: "#303030",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {header}
              <span style={iconStyle}>+</span>
            </div>
            {isOpen && (
              <div style={detailsStyle}>
                <>{detail}</>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
      
};

export default Accordion;
