import React from "react";

import "./Footer.css";

import { BsCode } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { SiJavascript } from "react-icons/si";

export default (props) => {
    return (
        <footer className="footer">
            <div>
                <span>
                    <BsCode size={20} />
                    &nbsp; Desenvolvido com &nbsp;
                    <BsSuitHeart size={20} />
                    &nbsp; utilizando &nbsp;
                    <SiJavascript size={20}/>
                    &nbsp;
                    <BsCodeSlash size={20} />
                </span>
            </div>
        </footer>
    );
};
