import { useState } from "react";
import PersonalInfo from "../../screens/settings/PersonalInfo";

const PersonalInfoController = () =>{

    const [usernameClicked, setUsernameClicked] = useState(false);
    const [passwordClicked, setPasswordClicked] = useState(false);

    const [text, setText] = useState("");

    const updateUserData = (field) =>{

        if(field === "Username"){

            setUsernameClicked(false);
        }else{

            setPasswordClicked(false);
        }
    }

    return(

        <PersonalInfo
        
            setUsernameClicked={setUsernameClicked}
            setPasswordClicked={setPasswordClicked}
            setText={setText}

            usernameClicked={usernameClicked}
            passwordClicked={passwordClicked}
            text={text}

            updateUserData={updateUserData}
        ></PersonalInfo>
    );
}

export default PersonalInfoController;
