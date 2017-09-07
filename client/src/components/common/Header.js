import React, { Component } from 'react';
import { 
	Text,
	View
} from 'react-native';

const Header = (props) => {
	const { textStyle, viewStyle } = styles;

	return(
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#007aff'
	}
};

export { Header };