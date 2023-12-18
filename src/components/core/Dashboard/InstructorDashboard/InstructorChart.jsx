import React, { useState } from 'react'

const InstructorChart = () => {

    const [currChart, setCurrChart] = useState("students")

    // Function To generate Random Colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors;
    }

  return (
    <div>
      
    </div>
  )
}

export default InstructorChart
