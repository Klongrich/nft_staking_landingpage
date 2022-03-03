import React from "react";

const Progress_bar = ({bgcolor,progress,height} : any) => {
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        border: '2px solid #CD8285',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        margin: 50
      }
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
      }

    return (
        <>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                </div>
            </div>
        </>
    )
}

export default Progress_bar;