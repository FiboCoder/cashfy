import React, { useState } from "react";
import Home from "../../screens/main/Home"

const HomeController = () =>{

    const [pressedButton, setPressedButton] = useState("Balance");

    return(

        <Home

            setPressedButton={setPressedButton}
            pressedButton={pressedButton}
        ></Home>
    );
}

export default HomeController;