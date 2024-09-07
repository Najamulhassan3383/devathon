import React, { useState } from 'react'
import { BsPhone } from 'react-icons/bs'
import { LiaAddressCard } from 'react-icons/lia'
import { MdEmail } from 'react-icons/md'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useUser } from '../context/UserContext'
import { useCookies } from 'react-cookie';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from '../key'

const Profile = () => {
    const { isUser, setIsUser } = useUser();
    const [cookies, setCookies, removeCookies] = useCookies(['x-auth-token']);
    const navigate = useNavigate();

    // States for edit profile
    const [editProfile, setEditProfile] = useState(false);
    const [fName, setFName] = useState(isUser?.fName);
    const [lName, setLName] = useState(isUser?.lName);
    const [email, setEmail] = useState(isUser?.email);

    // States for password change
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Logout function
    const handleLogout = () => {
        setIsUser(null);
        removeCookies('x-auth-token');
        message.success('Logged out successfully');
        navigate('/login');
    };

    // Function to handle profile update
    const handleUpdateProfile = async () => {
        await axios.put(`${SERVER_URL}/api/user/update-profile`, { fName, lName, email }, {
            headers: {
                'x-auth-token': cookies['x-auth-token']
            }
        })
        const updatedUser = { fName, lName, email };
        setIsUser(updatedUser);
        setEditProfile(false);
        message.success('Profile updated successfully');
    };

    // Function to handle password change
    const handleChangePassword = async () => {
        await axios.post(`${SERVER_URL}/api/user/change-profile-password`, { email, oldPassword, password: newPassword }, {
            headers: {
                'x-auth-token': cookies['x-auth-token']
            }
        })
        // Perform API call to update password
        if (oldPassword && newPassword) {
            message.success('Password updated successfully');
            // Clear password fields
            setOldPassword('');
            setNewPassword('');
        } else {
            message.error('Please fill out both fields');
        }
    };

    return (
        <div className='sm:m-9 m-3'>
            <div className='sm:flex block'>
                <div className='left sm:w-[400px] w-[100%] mr-3'>
                    <div className='border-[1px] p-4 text-center'>
                        <img
                            src='https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0'
                            alt='User Profile'
                            className='w-32 h-32 rounded-full mx-auto mb-4'
                        />
                        <h2 className='text-xl font-semibold'>{isUser?.fName} {isUser?.lName}</h2>
                        <button onClick={handleLogout} className='bg-primary w-[230px] text-white font-bold py-2 px-4 rounded mt-10'>
                            Logout
                        </button>
                    </div>

                    <div className='border-[1px] mt-3 p-4'>
                        <div className='flex mb-4'>
                            <MdEmail className='mx-3' size={25} /> {isUser?.email}
                        </div>
                    </div>
                </div>

                <div className='right sm:w-[800px] w-[100%]'>
                    <div className='border-[1px] p-4'>
                        <div className='flex font-bold text-[16px]'>
                            <HiOutlineDocumentText size={25} /> <span className='ml-2'>GENERAL INFORMATION</span>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>

                        {editProfile ? (
                            <>
                                <div className='flex font-medium'>
                                    <div className='w-[50%]'>First Name</div>
                                    <div className='w-[50%]'>
                                        <input
                                            type='text'
                                            value={fName}
                                            onChange={(e) => setFName(e.target.value)}
                                            className='border p-2 w-full'
                                        />
                                    </div>
                                </div>
                                <div className='my-3 border-t-[1px]'></div>
                                <div className='flex font-medium'>
                                    <div className='w-[50%]'>Last Name</div>
                                    <div className='w-[50%]'>
                                        <input
                                            type='text'
                                            value={lName}
                                            onChange={(e) => setLName(e.target.value)}
                                            className='border p-2 w-full'
                                        />
                                    </div>
                                </div>
                                <div className='my-3 border-t-[1px]'></div>
                                <button onClick={handleUpdateProfile} className='bg-primary text-white font-bold py-2 px-4 rounded'>
                                    Save Changes
                                </button>
                                <button onClick={() => setEditProfile(false)} className='bg-gray-500 text-white font-bold py-2 px-4 rounded ml-3'>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <div className='flex font-medium'>
                                    <div className='w-[50%]'>Full Name</div>
                                    <div className='w-[50%] text-gray-600'>{isUser?.fName} {isUser?.lName}</div>
                                </div>
                                <div className='my-3 border-t-[1px]'></div>
                                <div className='flex font-medium'>
                                    <div className='w-[50%]'>Preferred Name</div>
                                    <div className='w-[50%] text-gray-600'>{isUser?.fName}</div>
                                </div>
                                <div className='my-3 border-t-[1px]'></div>
                                <button onClick={() => setEditProfile(true)} className='bg-primary text-white font-bold py-2 px-4 rounded'>
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>

                    <div className='border-[1px] p-4 mt-4'>
                        <h3 className='font-bold text-[16px] mb-4'>Change Password</h3>
                        <div className='flex font-medium'>
                            <div className='w-[50%]'>Old Password</div>
                            <div className='w-[50%]'>
                                <input
                                    type='password'
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className='border p-2 w-full'
                                />
                            </div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <div className='flex font-medium'>
                            <div className='w-[50%]'>New Password</div>
                            <div className='w-[50%]'>
                                <input
                                    type='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='border p-2 w-full'
                                />
                            </div>
                        </div>
                        <div className='my-3 border-t-[1px]'></div>
                        <button onClick={handleChangePassword} className='bg-primary text-white font-bold py-2 px-4 rounded'>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
