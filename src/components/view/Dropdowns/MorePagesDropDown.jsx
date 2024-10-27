import React from 'react'
import { Dropdown } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAngleDown } from "react-icons/fa6";

import { translate } from 'src/utils';

const MorePagesDropDown = ({handleClose}) => {

    const router = usePathname();

    const items = [
        {
            key: '1',
            label: (
                <>
                    <span>
                        <Link href='/terms-condition' className={`dropdownItem ${router === '/terms-condition' ? 'navActive' : ''}`} onClick={handleClose}>
                            {translate('termsandcondition')}
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
                        <Link id='btnBookmark' href='/privacy-policy' className={`dropdownItem ${router === '/privacy-policy' ? 'navActive' : ''}`} onClick={handleClose}>
                            {translate('priPolicy')}
                        </Link>
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
                className="navDropdown commonDropDown"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <span className={`nav-link headerDropdownItem ${router === '/terms-condition' || router === '/privacy-policy' ? 'navLinkActive' : ''}`}>
                        More Pages
                        <FaAngleDown />
                    </span>
                </a>
            </Dropdown>
        </div>
    )
}

export default MorePagesDropDown
