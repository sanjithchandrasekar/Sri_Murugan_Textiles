import React from 'react';
import muruganLogo from "../assets/murugan.png";

export default function Preloader({ preGone }) {
  return (
    <div className={`pre${preGone ? " gone" : ""}`}>
      <img src={muruganLogo} alt="Murugan Textiles Logo" className="pre-logo" />
      <div className="pre-brand">Sri&nbsp;<em>Murugan</em>&nbsp;Textiles</div>
      <div className="pre-bar-wrap"><div className="pre-bar" /></div>
      <div className="pre-txt">Factory Direct Sales · Since 2010</div>
    </div>
  );
}
