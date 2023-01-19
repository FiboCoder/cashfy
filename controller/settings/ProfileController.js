import { useRoute } from "@react-navigation/native";
import Profile from "../../screens/settings/Profille";

const ProfileController = () =>{

    const route = useRoute();

    return(

        <Profile

            userData={route.params.userData}
        ></Profile>
    );
}

export default ProfileController;