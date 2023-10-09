import React, { useState, useContext } from 'react';
import { StateContext } from '../../context/StateContext.jsx';
import CenterModal from '../Modal/CenterModal.jsx';
import Button from '../Form/Button.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const AccountModal = () => {
    const { accountModalShow, setAccountModalShow } = useContext(StateContext);
    const [showLoginFields, setShowLoginFields] = useState(true);
    const handleToggleForm = () => setShowLoginFields(!showLoginFields);

    return (
        accountModalShow &&
        < CenterModal showModal={accountModalShow} toggleModal={() => setAccountModalShow(!accountModalShow)}>
            <div className='flex justify-end'>
                <Button text='&times;'
                    onClick={() => setAccountModalShow(!accountModalShow)}
                    className="rounded-full w-8 h-8 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
            {
                showLoginFields ? (
                    <>
                        <Login />
                        <p className='flex items-center justify-center mt-4 space-y-6'>
                            New User?&nbsp;
                            <a href="#" onClick={handleToggleForm} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                                Click Here!
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <Signup />
                        <p className='flex items-center justify-center mt-4 space-y-6'>
                            Already have an account?&nbsp;
                            <a href="#" onClick={handleToggleForm} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                                Click Here!
                            </a>
                        </p>
                    </>

                )
            }
        </CenterModal >
    );
}

export default AccountModal;