import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
// import LabelIcon from '@material-ui/icons/Label';
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
                // icon={<../public/favicon.ico />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/factdata`}
                    primaryText={translate(`Fact Data`, {
                        smart_count: 2,
                    })}
                    // leftIcon={<products.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/dimensions`}
                    primaryText={translate(`Dimensions`, {
                        smart_count: 2,
                    })}
                    // leftIcon={<categories.icon />}
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
                // icon={<aggregator.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/targets`}
                    primaryText={translate(`Targets`, {
                        smart_count: 2,
                    })}
                    // leftIcon={<targets.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/sources`}
                    primaryText={translate(`Sources`, {
                        smart_count: 2,
                    })}
                    // leftIcon={<sources.icon />}
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
                // icon={<uderadmin.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/users`}
                    primaryText={translate(`Users`, {
                        smart_count: 2,
                    })}
                    // leftIcon={<users.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/roles`}
                    primaryText={translate(`Roles`, {
                        smart_count: 2,
                    })}
                    // leftIcon={<Permissions.icon />}
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
