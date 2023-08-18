import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";

const Wrapper = styled.section`
	width: 100vw;
	height: 20vh;
	max-height: 300px;
	min-height: 150px;
	padding: 20px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
    background:linear-gradient(133deg, #48c1efcf 0%, #6fd6ab 100%);
	background-size: cover;
	margin-bottom: -50px;

	h1 {
		font-size: 3rem;
		text-align: center;
		margin-bottom: 100px;
		color: #ffffff;
        font-family:cursive;
	}
`;

const Background = (props) => {

	
	return (
		<Wrapper>
			
			<h1>{props.title}</h1>
		</Wrapper>
	);
};

Background.propTypes = {
	title: PropTypes.string,
};

export default Background;
