import React from 'react'
import { Dropdown } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAngleDown } from "react-icons/fa6";

import { translate, truncateText } from 'src/utils';

const ProfileDropDown = ({ userName, userData, logout, profileimg, profileimgError, handleClose, deleteAccount, userRole }) => {

    const router = usePathname();

    const items = [
        {
            key: '1',
            label: (
                <>
                    <span>
                        <Link href='/bookmark' className={`dropdownItem ${router === '/bookmark' ? 'navActive' : ''}`} onClick={handleClose}>
                            {translate('bookmark')}
                        </Link>
                    </span>
                </>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    <span>
                        <Link id='btnBookmark' href='/user-based-categories' className={`dropdownItem ${router === '/user-based-categories' ? 'navActive' : ''}`} onClick={handleClose}>
                            {translate('managePreferences')}
                        </Link>
                    </span>
                </>
            ),
        },
        {
            key: '3',
            label: (
                <>
                    <span>
                        <Link id='btnBookmark' href='/profile-update' className={`dropdownItem ${router === '/profile-update' ? 'navActive' : ''}`} onClick={handleClose}>
                            {translate('update-profile')}
                        </Link>
                    </span>
                </>
            ),
        },
        ...(userRole?.role !== 0 ? [
            {
                key: '6',
                label: (
                    <>
                        <span>
                            <Link id='btnBookmark' href='/create-news' className={`dropdownItem ${router === '/create-news' ? 'navActive' : ''}`} onClick={handleClose}>
                                {translate('createNewsLbl')}
                            </Link>
                        </span>
                    </>
                ),
            },
            {
                key: '7',
                label: (
                    <>
                        <span>
                            <Link id='btnBookmark' href='/manage-news' className={`dropdownItem ${router === '/manage-news' ? 'navActive' : ''}`} onClick={handleClose}>
                                {translate('manageNewsLbl')}
                            </Link>
                        </span>
                    </>
                ),
            },
        ] : []),
        {
            key: '4',
            label: (
                <>
                    <span className={`dropdownItem`} onClick={deleteAccount}>
                        {translate('deleteAcc')}
                    </span>
                </>
            ),
        },
        {
            key: '5',
            label: (
                <>
                    <span className={`dropdownItem`} onClick={logout}>
                        {translate('logout')}
                    </span>
                </>
            ),
        },
    ];
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
                className="navDropdown commonDropDown profileDropDown"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <span className={`nav-link headerDropdownItem ${router === '/bookmark' || router === 'user-based-categories' || router === 'profile-update' || router === '/manage-news' || router === '/create-news' ? 'navLinkActive' : ''}`}>
                        <img
                            className='profile_photo'
                            src={userData.data && userData.data.profile ? userData.data.profile : profileimg}
                            onError={profileimgError}
                            alt='profile'
                        />
                        <span className='userName'>{truncateText(userName, 10)}</span>
                        <FaAngleDown />
                    </span>
                </a>
            </Dropdown>
        </div>
    )
}

export default ProfileDropDown
