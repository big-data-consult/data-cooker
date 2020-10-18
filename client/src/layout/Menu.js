import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import DonutSmall from '@material-ui/icons/DonutSmall';
import DataUsage from '@material-ui/icons/DataUsage';
import Assessment from '@material-ui/icons/Assessment';
import PermDataSetting from '@material-ui/icons/PermDataSetting';
import BurstMode from '@material-ui/icons/BurstMode';
import Storage from '@material-ui/icons/Storage';
import Settings from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import LabelIcon from '@material-ui/icons/Label';

import { useMediaQuery, Theme, Box } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';

import SubMenu from './SubMenu';
//import { AppState } from './types';

type MenuName = 'menuNormalizer' | 'menuAggregator' | 'menuUserAdmin';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuNormalizer: true,
        menuAggregator: true,
        menuUserAdmin: true,
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuNormalizer')}
                isOpen={state.menuNormalizer}
                sidebarIsOpen={open}
                name="Data Normalization"
                icon={<DonutSmall />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/factdata`}
                    primaryText={translate(`Fact Data`, {
                        smart_count: 2,
                    })}
                    leftIcon={<DataUsage />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/dimensions`}
                    primaryText={translate(`Dimensions`, {
                        smart_count: 2,
                    })}
                    leftIcon={<Assessment />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuAggregator')}
                isOpen={state.menuAggregator}
                sidebarIsOpen={open}
                name="Data Aggregation"
                icon={<BurstMode />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/targets`}
                    primaryText={translate(`Targets`, {
                        smart_count: 2,
                    })}
                    leftIcon={<PermDataSetting />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/sources`}
                    primaryText={translate(`Sources`, {
                        smart_count: 2,
                    })}
                    leftIcon={<Storage />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuUserAdmin')}
                isOpen={state.menuUserAdmin}
                sidebarIsOpen={open}
                name="User Management"
                icon={<Settings />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/users`}
                    primaryText={translate(`Users`, {
                        smart_count: 2,
                    })}
                    leftIcon={<PeopleIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/roles`}
                    primaryText={translate(`Roles`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LabelIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to={`/logout`}
                primaryText={translate(`Logout`, {
                    smart_count: 2,
                })}
                // leftIcon={<roles.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;
