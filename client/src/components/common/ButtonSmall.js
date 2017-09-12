import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonSmall = ({ onPress, children, backgroundColor, fontSize, width, marginLeft, marginRight, marginTop, marginBottom, position, top, right }) => {
	const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: fontSize || 16,
		fontWeight: 'bold',
		paddingTop: 10,
		letterSpacing: 2,
		paddingBottom: 10
	},
	buttonStyle: {
		width: width || 110,
		justifyContent: 'flex-end',
		backgroundColor: backgroundColor || '#EB9486',
		borderRadius: 25,
		marginLeft: marginLeft || null,
		marginRight: marginRight || null,
		marginTop: marginTop || null,
		marginBottom: marginBottom || null,
		position: position || null,
		top: top || null,
		right: right || null
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