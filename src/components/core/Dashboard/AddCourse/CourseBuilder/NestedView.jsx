import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {FaTrash} from "react-icons/fa"
import {AiFillCaretDown, AiOutlinePlus} from "react-icons/ai"
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubsection } from '../../../../../services/operation/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) => {
        const result = await deleteSubsection({
            subSectionId, sectionId, token
        })
        if(result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
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
                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
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

                {/* Sub-Section Field */}
                <div>
                    {section.subSection.map((data) => (
                        <div key={data?._id}
                        onClick={() => setViewSubSection(data)}
                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">{data.title}</p>
                            </div>

                            <div
                            className="flex items-center gap-x-3">
                                <button
                                onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                >
                                    <MdEdit className="text-xl text-richblack-300"/>
                                </button>

                                <button
                                onClick={() => 
                                setConfirmationModal({
                                text1: "Delete this Sub-Section?",
                                text2: "Selected lecture will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                btn2Handler: () => setConfirmationModal(null),
                                })
                                }
                                >
                                    <FaTrash className="text-xl text-richblack-300"/>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add Lecture Button */}
                    <button
                    onClick={() => setAddSubSection(section._id)}
                    className="mt-3 flex items-center gap-x-1 text-yellow-50"
                    >
                        <AiOutlinePlus />
                        <p>Add Lecture</p>
                    </button>
                </div>
            </details>
        ))}
      </div>

      {addSubSection ? (<SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
      />) 
      : viewSubSection ? (<SubSectionModal 
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
      />) 
      : editSubSection ? (<SubSectionModal 
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
      />) 
      : ( <div></div> )}

      {/* Render Confirmation Modal */}
      {confirmationModal ? (<confirmationModal modalData={confirmationModal}/>) : ( <div></div> )}

    </>
  )
}

export default NestedView
