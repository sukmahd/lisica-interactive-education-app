import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonBig = ({ onPress, children, backgroundColor, width, marginLeft, marginRight, bottom, position }) => {
	const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 28,
		fontWeight: 'bold',
		paddingTop: 10,
		letterSpacing: 4,
		paddingBottom: 10
	},
	buttonStyle: {
		width: width || 260,
		justifyContent: 'flex-end',
		backgroundColor: backgroundColor || '#5887FF',
		borderRadius: 50,
		marginLeft: marginLeft || null,
		marginRight: marginRight || null,
		bottom: bottom || null,
		position: position || null
	}
}
	
	return(
		<TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
			<Text style={styles.textStyle}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}



export { ButtonBig };