import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
// import {
//     DonutSmall,
//     DataUsage,
//     Assessment,
//     BurstMode,
//     PermDataSetting,
//     Storage,
//     Settings,
//     PeopleIcon,
//     LabelIcon,
//     SettingsIcon
// } from '@material-ui/icons';

//import DonutLargeIcon from '@material-ui/icons/DonutLarge';
//import BookIcon from '@material-ui/icons/Book';
import TableChartIcon from '@material-ui/icons/TableChart';
import CategoryIcon from '@material-ui/icons/Category';
import DonutSmall from '@material-ui/icons/DonutSmall';
import FilterBAndWIcon from '@material-ui/icons/FilterBAndW';

import CollectionIcon from '@material-ui/icons/Collections';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import PermDataSetting from '@material-ui/icons/PermDataSetting';
import Storage from '@material-ui/icons/Storage';

import AccountBalance from '@material-ui/icons/AccountBalance';
import Assessment from '@material-ui/icons/Assessment';
import BarChartIcon from '@material-ui/icons/BarChart';

import Settings from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import LabelIcon from '@material-ui/icons/Label';

import SettingsIcon from '@material-ui/icons/Settings';

import { useMediaQuery, Theme, Box } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';

import SubMenu from './SubMenu';
//import { AppState } from './types';

type MenuName = 'menuNormalizer' | 'menuAggregator' | 'menuAllocator' | 'menuScheduler' | 'menuUserAdmin';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuNormalizer: true,
        menuAggregator: true,
        menuAllocator: true,
        menuScheduler: true,
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
            {/* <SubMenu
                handleToggle={() => handleToggle('menuNormalizer')}
                isOpen={state.menuNormalizer}
                sidebarIsOpen={open}
                name="Data Normalization"
                icon={<TableChartIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/dimensions`}
                    primaryText={translate(`Dimensions`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CategoryIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/factdata`}
                    primaryText={translate(`Fact Data`, {
                        smart_count: 2,
                    })}
                    leftIcon={<DonutSmall />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/rawdata`}
                    primaryText={translate(`Raw Data`, {
                        smart_count: 2,
                    })}
                    leftIcon={<FilterBAndWIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu> */}
            <SubMenu
                handleToggle={() => handleToggle('menuAggregator')}
                isOpen={state.menuAggregator}
                sidebarIsOpen={open}
                name="Data Aggregation"
                icon={<CollectionIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/landscape`}
                    primaryText={translate(`Alignment`, {
                        smart_count: 2,
                    })}
                    leftIcon={<SettingsInputComponentIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
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
            {/* <SubMenu
                handleToggle={() => handleToggle('menuAllocator')}
                isOpen={state.menuAllocator}
                sidebarIsOpen={open}
                name="Data Allocation"
                icon={<AccountBalance />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/summaries`}
                    primaryText={translate(`Summaries`, {
                        smart_count: 2,
                    })}
                    leftIcon={<Assessment />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/buckets`}
                    primaryText={translate(`Buckets`, {
                        smart_count: 2,
                    })}
                    leftIcon={<BarChartIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu> */}
            <SubMenu
                handleToggle={() => handleToggle('menuScheduler')}
                isOpen={state.menuScheduler}
                sidebarIsOpen={open}
                name="Task Scheduler"
                icon={<CollectionIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/jobs`}
                    primaryText={translate(`Jobs`, {
                        smart_count: 2,
                    })}
                    leftIcon={<PermDataSetting />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/tasks`}
                    primaryText={translate(`Tasks`, {
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
                    to={`/departments`}
                    primaryText={translate(`Departments`, {
                        smart_count: 2,
                    })}
                    leftIcon={<GroupWorkIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
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
