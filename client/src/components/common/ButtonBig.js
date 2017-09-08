import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonBig = ({ onPress, children, backgroundColor, width, marginLeft, marginRight }) => {
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
		width: width || 260,
		justifyContent: 'flex-end',
		backgroundColor: backgroundColor || '#1ebea5',
		borderRadius: 50,
		marginLeft: marginLeft || null,
		marginRight: marginRight || null
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