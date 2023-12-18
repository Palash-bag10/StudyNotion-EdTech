import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({courses}) => {

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

    // Create data for displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    // Data for the chart displaying income information
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenarated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    // create options
    const options = {
        maintainAspectRatio: false,
    }

  return (
    <div>
      <p>Visualise</p>
      <div>
        <button
        onClick={() => setCurrChart("students")}
        >
            Student
        </button>

        <button
        onClick={() => setCurrChart("income")}
        >
            Income
        </button>
      </div>
      <div>
        <Pie 
          data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
