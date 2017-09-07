import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonSmall = ({ onPress, children, backgroundColor }) => {
	const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyle: {
		width: 110,
		justifyContent: 'flex-end',
		backgroundColor: backgroundColor,
		borderRadius: 25
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



export { ButtonSmall };