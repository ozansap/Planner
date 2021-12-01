import { useState } from 'react';
import { UserType } from '../types/types';

import '../styles/Add&Edit.scss';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setEditGroup: React.Dispatch<React.SetStateAction<boolean>>;
  groupID: string;
}

export default function EditGroup({
  userState, setUserState, saveData, setEditGroup, groupID
}: props) {
  const closeWindow = (): void => {
    setEditGroup(false);
  }

  const handleChange = (property: string, value: any): void => {
    setInputState({...inputState, [property]: value});
  }

  const handleSave = (): void => {
    let newUserState = {...userState};

    let oldData = newUserState.groups.get(groupID)!;
    let newData = {...oldData, ...inputState};
    
    newUserState.groups.set(groupID, newData);

    setUserState({...newUserState});
    saveData();
    closeWindow();
  }

  const handleDelete = (): void => {

  }

  const [inputState, setInputState] = useState(userState.groups.get(groupID)!);

  return (
    <div className="Edit">
      <div className="Edit-bg"
        onClick={closeWindow}
      ></div>
      <div className="Edit-main">
        <div className="Edit-main-inputs">
          <div className="Edit-main-inputs-name">
            <label>Group Name</label>
            <input 
              type="text" 
              value={inputState.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
        </div>
        <div className="Edit-main-buttons">
          <h3
            onClick={closeWindow}
          >Cancel</h3>
          <h3
            onClick={handleSave}
          >Save</h3>
          <h3 className="Edit-main-buttons-delete"
            onClick={handleDelete}
          >Delete</h3>
        </div>
      </div>
    </div>
  );
}