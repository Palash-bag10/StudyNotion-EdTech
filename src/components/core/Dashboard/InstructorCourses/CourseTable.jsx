import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { formatDate } from '../../../../services/formatDate'

const CourseTable = ({courses, setCourses}) => {
  return (
    <>
    <Table className="rounded-xl border border-richblack-800" >
        <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                <Th className=" flex-1 text-left text-sm uppercase text-richblack-100 font-medium">
                    Courses
                </Th>
                <Th className="text-left text-sm uppercase text-richblack-100 font-medium">
                    Duration
                </Th>
                <Th className="text-left text-sm uppercase text-richblack-100 font-medium">
                    Price
                </Th>
                <Th className="text-left text-sm uppercase text-richblack-100 font-medium">
                    Actions
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                courses?.length === 0
                ? (
                    <Tr>
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                            No Course Found
                        </Td>
                    </Tr>
                )
                : (
                    courses?.map((course) => (
                        <Tr 
                        key={course._id}
                        className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                        >
                            <Td className="flex flex-1 gap-x-4">
                                <img
                                 src={course?.thumbnail}
                                 alt={course?.courseName}
                                 className='h-[148px] w-[220px] object-cover rounded-lg'
                                />
                                <div className='flex flex-col justify-between'>
                                    <p className='text-lg font-semibold text-richblack-5'>
                                        {course?.courseName}
                                    </p>
                                    <p className='text-xs text-richblack-300'>
                                        {course?.courseDescription}
                                    </p>
                                    <p className='text-[12px] text-white'>
                                        Created: {formatDate(course.createdAt)}
                                    </p>
                                </div>
                            </Td>
                        </Tr>
                    ))
                )
            }
        </Tbody>
    </Table>
    </>
  )
}

export default CourseTable
