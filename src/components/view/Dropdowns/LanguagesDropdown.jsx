import React from 'react';
import { Dropdown, Menu } from 'antd';
import { translate } from 'src/utils';
import { FaAngleDown } from 'react-icons/fa';

const LanguageDropdown = ({ currentLanguage, languagesData, languageChange,handleClose }) => {
    const menu = (
        <Menu>
            {languagesData &&
                languagesData.map((data, index) => (
                    <Menu.Item
                        key={index}
                        onClick={() =>
                            languageChange(data.language, data.code, data.id, data.display_name)
                        }
                        className={`dropdownItem`}
                    >
                        {data.display_name ? data.display_name : data.language}
                    </Menu.Item>
                ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}  className="navDropdown commonDropDown languageDropdown" 
        // open={true}
        >
            <span className="language_drop">
                {currentLanguage?.displayName
                    ? currentLanguage?.displayName
                    : currentLanguage?.name}
                <FaAngleDown />
            </span>
        </Dropdown>
    );
};

export default LanguageDropdown;