////////////////////////////////////////////////////////////////////////////
//
// Copyright 2018 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import React from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
} from 'reactstrap';

export const AddClassModal = ({
  isOpen,
  toggle,
  onNameChange,
  onPKChange,
  onPKNameChange,
  onPKTypeChange,
  onSubmit,
  name,
  nameIsValid,
  primaryKey,
  primaryKeyName,
  primaryKeyType,
}: {
  isOpen: boolean;
  toggle: () => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPKChange: () => void;
  onPKNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPKTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  nameIsValid: boolean;
  primaryKey: boolean;
  primaryKeyName: string;
  primaryKeyType: string;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Form onSubmit={onSubmit}>
        <ModalHeader toggle={toggle}>Add a class to the schema</ModalHeader>
        <ModalBody>
          <FormGroup className={nameIsValid ? '' : 'has-danger'}>
            <Label for="name">Name</Label>
            <Input
              name="name"
              id="name"
              type="text"
              required={true}
              value={name}
              onChange={onNameChange}
            />
            {!nameIsValid && (
              <FormFeedback>
                A class with that name already exists.
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup className={nameIsValid ? '' : 'has-danger'}>
            <Label for="primaryKey">Primary key</Label>
            <InputGroup>
              <InputGroupText>
                <Input
                  addon
                  type="checkbox"
                  id="primaryKey"
                  name="primaryKey"
                  checked={primaryKey}
                  onChange={onPKChange}
                />
              </InputGroupText>
              <Input
                placeholder="_id"
                name="primaryKeyName"
                type="text"
                value={primaryKeyName}
                onChange={onPKNameChange}
                disabled={!primaryKey}
              />
              <InputGroupText>
                <Label check>
                  <Input
                    addon
                    type="radio"
                    name="primaryKeyType"
                    value="objectId"
                    checked={primaryKeyType === 'objectId'}
                    onChange={onPKTypeChange}
                    disabled={!primaryKey}
                  />{' '}
                  objectId
                </Label>
              </InputGroupText>
              <InputGroupText>
                <Label check>
                  <Input
                    addon
                    type="radio"
                    name="primaryKeyType"
                    value="int"
                    checked={primaryKeyType === 'int'}
                    onChange={onPKTypeChange}
                    disabled={!primaryKey}
                  />{' '}
                  int
                </Label>
              </InputGroupText>
              <InputGroupText>
                <Label check>
                  <Input
                    addon
                    type="radio"
                    name="primaryKeyType"
                    value="string"
                    checked={primaryKeyType === 'string'}
                    onChange={onPKTypeChange}
                    disabled={!primaryKey}
                  />{' '}
                  string
                </Label>
              </InputGroupText>
            </InputGroup>
          </FormGroup>
          {primaryKey && (
            <Card>
              {/* Todo: Wording */}
              <CardBody>
                <CardSubtitle>Atlas Device Sync:</CardSubtitle>
                <CardText>
                  <small>
                    {
                      'If this Realm is intended to be synced with Atlas Device Sync, ensure to keep the primary key name "_id", with the type "objectId".'
                    }
                  </small>
                </CardText>
                <CardSubtitle>UUID auto generation:</CardSubtitle>
                <CardText>
                  <small>
                    {
                      'If the primary key is named "uuid" with the type "string", Studio will auto generate a UUID (v4) for new entries.'
                    }
                  </small>
                </CardText>
              </CardBody>
            </Card>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={!nameIsValid}>
            Add class
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
