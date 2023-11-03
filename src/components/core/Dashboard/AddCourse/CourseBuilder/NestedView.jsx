import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const NestedView = () => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div>
      
    </div>
  )
}

export default NestedView
