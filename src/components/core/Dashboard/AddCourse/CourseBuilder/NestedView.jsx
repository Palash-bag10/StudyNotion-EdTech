import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {FaTrash} from "react-icons/fa"
import {AiFillCaretDown} from "react-icons/ai"

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = (sectionId) => {

    }

  return (
    <>
      <div className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
            <details key={section._id} open>
                <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                    <div className="flex items-center gap-x-3">
                        <RxDropdownMenu className="text-2xl text-richblack-50"/>
                        <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                    </div>

                    <div className="flex items-center gap-x-3">
                        <button
                        onClick={handleChangeEditSectionName(section._id, section.sectionName)}
                        >
                            <MdEdit className="text-xl text-richblack-300"/>
                        </button>

                        <button
                        onClick={() => {
                            setConfirmationModal({
                                text1: "Delete this Section?",
                                text2: "All the lectures in this section will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleteSection(section._id),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }}
                        >
                            <FaTrash className="text-xl text-richblack-300"/>
                        </button>

                        <span className="font-medium text-richblack-300">|</span>
                        <AiFillCaretDown className="font-medium text-richblack-300"/> 

                    </div>
                </summary>
            </details>
        ))}
      </div>
    </>
  )
}

export default NestedView
