import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonBig = ({ onPress, children }) => {
	const { buttonStyle, textStyle } = styles;
	
	return(
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}

const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 28,
		fontWeight: 'bold',
		paddingTop: 14,
		paddingBottom: 14
	},
	buttonStyle: {
		width: 260,
		justifyContent: 'flex-end',
		backgroundColor: '#1ebea5',
		borderRadius: 50
	}
}

export { ButtonBig };