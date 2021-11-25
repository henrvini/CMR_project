import "./Footer.css";
import React from "react";

export default (props) => {
    return (
        <footer className="footer">
            <span>
                <i className="fa fa-code text-danger"></i> Desenvolvido por{" "}
                <strong> Vinicius Rodrigues </strong>
                <i className="fa fa-code text-danger"></i>
            </span>
        </footer>
    );
};
