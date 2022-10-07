import React from 'react'
import "./Footer.css";
import {FaGithub, FaLinkedinIn} from 'react-icons/fa';

export default function Foother() {
  return (
    <div className='footer'>
            <h1>Created By</h1>
        
        <div className='col'>
            <h3>Jeff Marks</h3>
            <a href="https://www.linkedin.com/in/jeffmarks114/" target="blank"><FaLinkedinIn className='icon' /></a>
            <a href="https://github.com/jefftmarks" target="blank"><FaGithub className='icon' /></a>
        </div>
        
        <div className='col'>
            <h3>Thierry Yabre</h3>
            <a href="https://www.linkedin.com/in/thierry-yabre/" target="blank"><FaLinkedinIn className='icon' /></a>
            <a href="https://github.com/Cresus9" target="blank"><FaGithub className='icon' /></a>
            
        </div>
     </div>
)}
