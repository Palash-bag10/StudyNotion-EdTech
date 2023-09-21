import React, { useEffect } from 'react'
import { useState } from 'react'

const RequirementField = ({name, lable, register, setValue, getValues, errors}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([])

    useEffect(() => {
        register(name, {
            require: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1)
        setRequirementList(updatedRequirementList)
    }

  return (
    <div>
      
        <label htmlFor={name}>{lable}</label>
        <div>
            <input 
                type="text" 
                id={name}
                onChange={(e) => setRequirement(e.target.value)}
                value={requirement}
            />
            <button
            type='button'
            onClick={handleAddRequirement}>
                Add
            </button>
        </div>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => (
                            <li 
                            key={index}>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}>
                                    Clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

        {
            errors[name] && (
                <span>{lable} is Required</span>
            )
        }
    </div>
  )
}

export default RequirementField
