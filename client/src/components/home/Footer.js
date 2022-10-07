import React from 'react'
import "./Footer.css";
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer'>
			<div className="contact-container">
				<div className='contact-card'>
					<h3>Jeff Marks</h3>
					<div className="contact-icons">
						<a href="https://www.linkedin.com/in/jeffmarks114/" target="blank"><FaLinkedinIn className='icon' /></a>
						<a href="https://github.com/jefftmarks" target="blank"><FaGithub className='icon' /></a>
					</div>
				</div>
				<div className='contact-card'>
					<h3>Thierry Yabre</h3>
					<div className="contact-icons">
						<a href="https://www.linkedin.com/in/thierry-yabre/" target="blank"><FaLinkedinIn className='icon' /></a>
						<a href="https://github.com/Cresus9" target="blank"><FaGithub className='icon' /></a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer;