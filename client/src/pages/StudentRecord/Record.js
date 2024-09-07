import React, { useState } from 'react'
import { BsPhone } from 'react-icons/bs'
import { LiaAddressCard } from 'react-icons/lia'
import { MdEmail } from 'react-icons/md'
import { HiOutlineDocumentText } from 'react-icons/hi'

const Record = () => {
    //eslint-disable-next-line
    const [data, setData] = useState({
        fullName: 'John Doe',
        preferedName: 'John',
        email: 'johndoe@gmail.com',
        address: '123, Lorem Ipsum, Dolor Sit Amet',
        phone: '1234567890',
        bateOfBirth: '01/01/2000',
        gender: 'Male',
        language: 'English',
        studentId: '1234567890',
        englishProfiency: 'Good',
        nationality: 'Indian',
    })

    return (
        <div className='sm:m-9 m-3'>
            <div className='sm:flex block'>
                <div className='left sm:w-[400px] w-[100%] mr-3'>
                    <div className='border-[1px] p-4 text-center'>
                        <img
                            src='https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0' // Replace 'path_to_image.jpg' with the actual image path
                            alt='User Profile'
                            className='w-32 h-32 rounded-full mx-auto mb-4'
                        />
                        <h2 className='text-xl font-semibold'>{data.fullName}</h2>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded mt-4'>
                            Edit
                        </button>
                        <p className='mt-4 text-blue-600 font-bold'>Last Visited 04/07/2023</p>
                        <button className='bg-primary w-[230px] text-white font-bold py-2 px-4 rounded mt-10'>
                            Logout
                        </button>
                    </div>

                    <div className='border-[1px] mt-3 p-4'>
                        <div className='flex mb-4'>
                            <MdEmail className='mx-3' size={25} /> {data.email}
                        </div>
                        <div className='flex mb-4'>
                            <LiaAddressCard className='mx-3' size={25} /> {data.address}
                        </div>
                        <div className='flex mb-4'>
                            <BsPhone className='mx-3' size={25} />{data.phone}
                        </div>
                    </div>
                </div>
                <div className=' right sm:w-[800px] w-[100%]'>
                    <div className='border-[1px] p-4'>
                        <div className='flex font-bold text-[16px]'>
                            <HiOutlineDocumentText size={25} /> <span className='ml-2'>GENERAL INFORMATION</span>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Full Name</div>
                            <div className='w-[50%] text-gray-600'>{data.fullName}</div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Prefered Name</div>
                            <div className='w-[50%] text-gray-600'>{data.preferedName}</div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Date Of Birth</div>
                            <div className='w-[50%] text-gray-600'>{data.bateOfBirth}</div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Gender</div>
                            <div className='w-[50%] text-gray-600'>{data.gender}</div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Language</div>
                            <div className='w-[50%] text-gray-600'>{data.language}</div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Student Id</div>
                            <div className='w-[50%] text-gray-600'>{data.studentId}</div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Nationality</div>
                            <div className='w-[50%] text-gray-600'>{data.nationality}</div>
                        </div><div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>Email</div>
                            <div className='w-[50%] text-gray-600'>{data.email}</div>
                        </div><div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%] '>English Profiency</div>
                            <div className='w-[50%] text-gray-600'>{data.englishProfiency}</div>
                        </div>
                    </div>
                    <div className='border-[1px] mt-4  p-4'>
                        <div className='flex font-bold text-[16px]'>
                            <HiOutlineDocumentText size={25} /> <span className='ml-2'>OTHER INFORMATION</span>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Record
