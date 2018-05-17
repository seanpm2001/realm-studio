import * as React from 'react';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBlock,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import * as ros from '../../../../services/ros';

import { ISelection } from '..';
import { Sidebar } from '../../shared/Sidebar';

import { IUserSidebarContainerProps } from '.';
import { AccountsTable } from './AccountsTable';
import { MetadataTable } from './MetadataTable';
import { RealmsTable } from './RealmsTable';

import './UserSidebar.scss';

export interface IUserSidebarProps extends IUserSidebarContainerProps {
  onChangePassword: () => void;
  onDeletion: () => void;
  onMetadataAppended: () => void;
  onMetadataChanged: (index: number, key: string, value: string) => void;
  onMetadataDeleted: (index: number) => void;
  onRoleChanged: (role: ros.UserRole) => void;
  onToggle: () => void;
  roleDropdownOpen: boolean;
  selection: ISelection | null;
  toggleRoleDropdown: () => void;
}

export const UserSidebar = ({
  isOpen,
  onChangePassword,
  onDeletion,
  onMetadataAppended,
  onMetadataChanged,
  onMetadataDeleted,
  onRoleChanged,
  onToggle,
  roleDropdownOpen,
  selection,
  toggleRoleDropdown,
}: IUserSidebarProps) => {
  return (
    <Sidebar className="UserSidebar" isOpen={isOpen} onToggle={onToggle}>
      {selection && (
        <Card className="UserSidebar__Card">
          <CardBlock className="UserSidebar__Top">
            <CardTitle className="UserSidebar__Title">
              <span
                className="UserSidebar__TitleText"
                title={selection.user.userId}
              >
                {selection.user.userId}
              </span>
            </CardTitle>
            <ButtonDropdown
              isOpen={roleDropdownOpen}
              toggle={toggleRoleDropdown}
            >
              <DropdownToggle caret={true}>
                {selection.user.isAdmin ? 'Administrator' : 'Regular user'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => onRoleChanged(ros.UserRole.Administrator)}
                >
                  Administrator
                </DropdownItem>
                <DropdownItem
                  onClick={() => onRoleChanged(ros.UserRole.Regular)}
                >
                  Regular user
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </CardBlock>
          <CardBlock className="UserSidebar__Tables">
            <AccountsTable accounts={selection.user.accounts} />
            <MetadataTable
              metadatas={selection.user.metadata}
              onMetadataAppended={onMetadataAppended}
              onMetadataChanged={onMetadataChanged}
              onMetadataDeleted={onMetadataDeleted}
            />
            <RealmsTable realms={selection.realms} />
          </CardBlock>
          <CardBlock className="UserSidebar__Controls">
            <Button size="sm" onClick={() => onChangePassword()}>
              Change password
            </Button>
            <Button size="sm" color="danger" onClick={() => onDeletion()}>
              Delete
            </Button>
          </CardBlock>
        </Card>
      )}
    </Sidebar>
  );
};