import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonSmall = ({ onPress, children, backgroundColor, fontSize, width, marginLeft, marginRight, marginTop }) => {
	const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: fontSize || 16,
		fontWeight: 'bold',
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyle: {
		width: width || 110,
		justifyContent: 'flex-end',
		backgroundColor: backgroundColor,
		borderRadius: 25,
		marginLeft: marginLeft || null,
		marginRight: marginRight || null,
		marginTop: marginTop || null
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