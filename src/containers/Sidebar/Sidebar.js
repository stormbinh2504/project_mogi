import React, { Component } from "react";

import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { MdDashboard, MdOpenInBrowser } from "react-icons/md";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


const Sidebar = () => {
  const handleToggleSidebar = () => {

  }

  return (
    <div className="menu-sidebar">
      <ProSidebar
        image={false}
        rtl={false}
        collapsed={true}
        toggled={true}
        breakPoint="lg"
        onToggle={handleToggleSidebar}
        style={{ width: "250px" }}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Header
          </div>
        </SidebarHeader>

        <SidebarContent >
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
              suffix={<span className="suffix badge red shake-text">'NEW'</span>}
            >
              DashBoard
              <Link to="/dashboard" />
            </MenuItem>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu
              title="Customer"
              icon={<MdDashboard />}
            >
              <MenuItem >
                Customer1
                <Link to="/customer1" />
              </MenuItem>
              <MenuItem >
                Customer2
                <Link to="/customer2" />
              </MenuItem>
            </SubMenu>

            <SubMenu
              title="Report"
              icon={<MdDashboard />}
            >
              <MenuItem>
                Report1
                <Link to="/report1" />
              </MenuItem>
              <MenuItem>
                Report2
                <Link to="/report2" />
              </MenuItem>
              <MenuItem>
                Report3
                <Link to="/report3" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
