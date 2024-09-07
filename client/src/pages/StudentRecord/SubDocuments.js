import React from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import document from '../../assets/subDocumant.png'
import { HiOutlineDocumentText } from 'react-icons/hi'


const SubDocuments = () => {
    return (
        <div className='sm:m-9 m-3'>
            <div className='flex justify-between bg-orange-100 p-3'>
                <div className='font-bold'>Sub Documents</div>
                <div className='text-[20px] cursor-pointer text-orange-400 hover:text-orange-300'><BsFillArrowUpCircleFill /></div>
            </div>

            <div className='grid sm:grid-cols-4 grid-cols-2 gap-4 mt-4' >
                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>

                <div className='border-[1px] p-2'>
                    <img className='w-[500px] h-[180px]' src={document} alt="doc" />
                    <div className='flex mt-3 font-bold'>
                        <HiOutlineDocumentText size={25} color='grey' />
                        <div className='mt-1'>APPLICATION</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubDocuments
